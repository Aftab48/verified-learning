
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SubscriptionData {
  trial_end_date: string;
  is_active: boolean;
}

export const useSubscription = () => {
  const [trialData, setTrialData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data, error } = await supabase
          .from('user_subscriptions')
          .select('trial_end_date, is_active')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching subscription:', error);
          return;
        }

        setTrialData(data);
      }
      setLoading(false);
    };

    fetchSubscription();
  }, []);

  const getRemainingDays = () => {
    if (!trialData?.trial_end_date) return 0;
    
    const endDate = new Date(trialData.trial_end_date);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  return {
    isLoading: loading,
    trialEndDate: trialData?.trial_end_date,
    isActive: trialData?.is_active,
    remainingDays: getRemainingDays(),
  };
};
