// utils/dashboardData.ts
import { supabaseA } from './supabaseClients';
import { Booking, RecentDemo } from '@/types/dashboard2';

// Fetch key metrics
export const fetchDashboardMetrics = async (companyId: string) => {
  const { data: leads, error: leadsError } = await supabaseA
    .from('leads')
    .select('id, status')
    .eq('company_id', companyId);

  const { data: bookings, error: bookingsError } = await supabaseA
    .from('bookings')
    .select('id, status, type')
    .eq('company_id', companyId);

  if (leadsError || bookingsError) {
    console.error('Error fetching metrics:', leadsError || bookingsError);
    return null;
  }

  return {
    demoRequests: bookings.filter(b => b.type === 'demo').length,
    demosBooked: bookings.filter(b => b.type === 'demo' && b.status === 'scheduled').length,
    newNurseries: leads.filter(l => l.status === 'new').length,
    crmSignups: leads.filter(l => l.status === 'qualified').length,
  };
};

// Fetch demo pipeline data
export const fetchDemoPipeline = async (companyId: string) => {
  const { data, error } = await supabaseA
    .from('bookings')
    .select('id, status')
    .eq('company_id', companyId)
    .eq('type', 'demo');

  if (error) {
    console.error('Error fetching demo pipeline:', error);
    return null;
  }

  return {
    requested: data.length,
    scheduled: data.filter(b => b.status === 'scheduled').length,
    completed: data.filter(b => b.status === 'completed').length,
    converted: data.filter(b => b.status === 'completed').length * 0.3, // Example conversion rate
  };
};

// Fetch lead sources
// utils/dashboardData.ts
export const fetchLeadSources = async (companyId: string) => {
  // First approach: Using count per source
  const { data, error } = await supabaseA
    .from('leads')
    .select('source, count', { count: 'exact', head: true })
    .eq('company_id', companyId)
    .not('source', 'is', null);

  if (error) {
    console.error('Error fetching lead sources:', error);
    return [];
  }

  // Alternative approach if the above doesn't work:
  // Fetch all leads and group manually
  const { data: allLeads } = await supabaseA
    .from('leads')
    .select('source')
    .eq('company_id', companyId);

  const sourceCounts = allLeads?.reduce((acc, lead) => {
    const source = lead.source || 'Unknown';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(sourceCounts || {}).map(([name, value]) => ({
    name,
    value,
  }));
};

// utils/dashboardData.ts
export const fetchRecentDemos = async (companyId: string): Promise<RecentDemo[]> => {
  const { data, error } = await supabaseA
    .from('bookings')
    .select(`
      id,
      scheduled_at,
      status,
      leads:leads (
        first_name,
        last_name,
        metadata
      )
    `)
    .eq('company_id', companyId)
    .eq('type', 'demo')
    .order('scheduled_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching recent demos:', error);
    return [];
  }

  return data.map((booking: Booking) => {
    // Get the first lead (assuming one-to-many relationship)
    const lead = booking.leads?.[0] || {
      first_name: null,
      last_name: null,
      metadata: null
    };

    return {
      id: booking.id,
      nursery: lead.metadata?.nursery_name || 'Unknown Nursery',
      contact: `${lead.first_name || ''} ${lead.last_name || ''}`.trim() || 'Unknown',
      location: lead.metadata?.location || 'Unknown',
      date: new Date(booking.scheduled_at).toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short' 
      }),
      status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
    };
  });
};
