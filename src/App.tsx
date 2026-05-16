import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminCustomerDetail from "@/pages/admin/AdminCustomerDetail";
import AdminCustomers from "@/pages/admin/AdminCustomers";
import AdminExpenses from "@/pages/admin/AdminExpenses";
import AdminFinance from "@/pages/admin/AdminFinance";
import AdminLeads from "@/pages/admin/AdminLeads";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminMessages from "@/pages/admin/AdminMessages";
import AdminOffers from "@/pages/admin/AdminOffers";
import AdminProjectDetail from "@/pages/admin/AdminProjectDetail";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminServices from "@/pages/admin/AdminServices";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminReports from "@/pages/admin/AdminReports";
import AdminTasks from "@/pages/admin/AdminTasks";
import AdminTickets from "@/pages/admin/AdminTickets";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="customers/:id" element={<AdminCustomerDetail />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/:id" element={<AdminProjectDetail />} />
              <Route path="tasks" element={<AdminTasks />} />
              <Route path="offers" element={<AdminOffers />} />
              <Route path="finance" element={<AdminFinance />} />
              <Route path="accounts" element={<AdminFinance />} />
              <Route path="expenses" element={<AdminExpenses />} />
              <Route path="tickets" element={<AdminTickets />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
