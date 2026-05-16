-- DEV/DEMO ONLY. Do not run automatically in production.
-- Fake sample records for exercising the Eclipse Muhendislik CRM admin UI.

insert into public.customers (customer_name, customer_type, sector, contact_person, phone, email, website, address, status, source, tags, notes)
values
  ('Nova Lojistik A.S.', 'company', 'Lojistik', 'Selin Kaya', '+90 212 000 00 01', 'selin@example.test', 'https://example.test', 'Istanbul', 'active', 'referral', array['bakim', 'network'], 'Demo musteri.'),
  ('Atlas Klinik', 'company', 'Saglik', 'Emre Yildiz', '+90 216 000 00 02', 'emre@example.test', null, 'Istanbul', 'prospect', 'website', array['guvenlik'], 'Demo firsat kaynagi.'),
  ('Derya Ozturk', 'individual', 'Danismanlik', 'Derya Ozturk', '+90 532 000 00 03', 'derya@example.test', null, 'Kadikoy / Istanbul', 'active', 'phone', array['web'], 'Demo bireysel kayit.')
on conflict do nothing;

insert into public.leads (prospect_name, contact_person, phone, email, source, interested_service, estimated_value, probability, stage, expected_close_date, next_follow_up_date, notes)
values
  ('Atlas Klinik', 'Emre Yildiz', '+90 216 000 00 02', 'emre@example.test', 'website', 'Firewall ve yedekleme', 185000, 55, 'proposal_sent', current_date + 21, current_date + 2, 'Demo teklif bekliyor.'),
  ('Vera E-Ticaret', 'Merve Ak', '+90 212 000 00 04', 'merve@example.test', 'social', 'Bulut gecisi', 95000, 35, 'meeting_scheduled', current_date + 35, current_date + 7, 'Demo kesif toplantisi.')
on conflict do nothing;

insert into public.expenses (category, vendor, amount, vat, expense_date, payment_method, has_receipt, is_official, notes)
values
  ('software_subscription', 'Monitoring SaaS', 4250, 850, current_date - 5, 'credit_card', true, true, 'Demo abonelik gideri.'),
  ('hosting_domain', 'Cloud Provider', 7800, 1560, current_date - 12, 'bank_transfer', true, true, 'Demo hosting gideri.'),
  ('transport', 'Saha servis', 950, 0, current_date - 2, 'cash', false, false, 'Demo saha ziyareti.')
on conflict do nothing;
