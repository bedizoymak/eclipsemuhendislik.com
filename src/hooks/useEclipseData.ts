import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import type { ProjectRow, ServiceRow, SiteSettingsRow } from "@/integrations/supabase/types";
import { defaultProjects, defaultServices, defaultSettings } from "@/lib/eclipseContent";

export function usePublicServices() {
  const [services, setServices] = useState<ServiceRow[]>(defaultServices);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("services")
      .select("*")
      .eq("status", "published")
      .order("sort_order")
      .then(({ data }) => {
        if (data?.length) setServices(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
}

export function usePublicProjects() {
  const [projects, setProjects] = useState<ProjectRow[]>(defaultProjects);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("sort_order")
      .then(({ data }) => {
        if (data?.length) setProjects(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
}

export function usePublicSettings() {
  const [settings, setSettings] = useState<SiteSettingsRow>(defaultSettings);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setSettings({ ...defaultSettings, ...data });
      })
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}
