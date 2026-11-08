-- ============================================================
-- Anirudh Guthala — Portfolio | seed content (real site copy)
-- Idempotent: safe to re-run (updates existing rows)
-- ============================================================

INSERT INTO site_content (section, content) VALUES
('hero_name', 'Anirudh Guthula'),
('hero_headline', 'Building products, mostly in AI & voice.'),
('hero_subline', 'Third-year CSE student at KLH Bachupally.'),
('about_intro_1', 'Hi! I''m Anirudh — a third-year Computer Science student at KLH Bachupally. I like building products, especially in AI and voice. There''s something about teaching software to talk — and to listen — that I find genuinely fun.'),
('about_intro_2', 'Right now I''m building Vixesa, an AI voice calling startup that received a startup grant from Cartesia.ai. When I''m not on that, I''m usually comparing forecasting models or messing around with a new landing page idea.'),
('project_time_series_findings', 'Within the evaluated NN5, M4 and M5 series, seasonal methods such as Seasonal Naive and Holt-Winters tended to perform well on strongly seasonal demand, while simpler baselines remained competitive on short or highly variable series. The observed differences suggest that model suitability depends on demand characteristics, so no single model was best across all datasets.'),
('vixesa_blurb', 'An AI voice calling startup I''m building — software that picks up the phone, talks, and listens like a person would.'),
('vixesa_grant', 'Received a startup grant from Cartesia.ai'),
('utsavs_blurb', 'I designed and built the landing page for Utsavs, a Rajasthan-based event booking startup.'),
('utsavs_link', 'https://utsavs.app'),
('gdg_badge', 'GDG on Campus · KLH — part of the team'),
('certifications', 'Microsoft Azure AI Fundamentals (AI-900); AWS Certified Cloud Practitioner'),
('contact_email', 'g.anirudh754@gmail.com'),
('contact_linkedin', 'https://www.linkedin.com/in/guthula-anirudh-908601315/'),
('contact_github', 'https://github.com/Anirudh754697')
ON DUPLICATE KEY UPDATE content = VALUES(content);
