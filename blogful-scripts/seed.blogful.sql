BEGIN;

INSERT INTO whopipe_video_views
    (title, date_published, content)
VALUES
    ('Life in paradise', '2016-01-16 12:00:00',       'Despotato'),
  ('How I met my mother', '2016-01-16 12:00:00',       'I talk about how I read my mothers poetry'),
  ('Shape of my heart ',  '2016-05-01 15:00:00',       'Shape of Pooh'),
  ('South vs North',     '2017-02-22 12:00:00',       'UpTown Monk'),
  ('What the Buda thaught',      '2017-04-04 08:00:00',       'Despotato'),
  ('My life after 8 ',  '2017-04-23 15:00:00',       'Despotato'),
  ('Never been kissed', '2017-08-11 13:00:00',       'Cats that teach SQL'),
  ('My son my dog my pride ',  '2017-12-09 17:00:00',       'Despotato'),
  ('Postacards from my edge',     '2018-01-24 19:00:00',       'Cats that teach SQL'),
  ('Blgger blues',      '2018-01-29 11:00:00',       'Man''s not torrid'),
  ('Can take it no more', '2018-02-13 05:00:00',       'UpTown Monk'),
  ('DEA and the border conspiracy ',  '2018-03-13 09:00:00',       'Shape of Pooh'),
  ('Talk of the medicine community',     '2018-03-31 13:00:00',       'UpTown Monk'),
  ('Fake news', '2019-04-03 07:00:00',       'Despotato'),
  ('Tutti contentti',      '2019-05-05 21:00:00',       'UpTown Monk'),
  ('Give a man after midnight',      now() - '29 days'::INTERVAL, 'Man''s not torrid'),
  ('Northeast', now() - '29 days'::INTERVAL, 'Despotato'),
  ('Midwest ',  now() - '29 days'::INTERVAL, 'Cats that teach SQL'),
  ('Northeast', now() - '29 days'::INTERVAL, 'UpTown Monk'),
  ('Midwest ',  now() - '29 days'::INTERVAL, 'Despotato'),
  ('West',      now() - '29 days'::INTERVAL, 'Shape of Pooh'),
  ('Midwest ',  now() - '28 days'::INTERVAL, 'Cats that teach SQL'),

  ('Midwest ',  now() - '5 days'::INTERVAL,  'Cats that teach SQL'),