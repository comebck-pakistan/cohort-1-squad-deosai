import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

export function useSupabaseRealtime(
  table: string,
  filter: string | null,
  callback: (payload: any) => void
) {
  useEffect(() => {
    const supabase = createClient();
    let channel: RealtimeChannel;

    const setupSubscription = () => {
      let config: any = { event: "*", schema: "public", table };
      if (filter) {
        config.filter = filter;
      }

      channel = supabase
        .channel(`realtime_${table}_${Date.now()}`)
        .on("postgres_changes", config, (payload) => {
          callback(payload);
        })
        .subscribe();
    };

    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [table, filter, callback]);
}
