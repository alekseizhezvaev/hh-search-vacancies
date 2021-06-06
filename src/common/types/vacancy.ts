// api.hh.ru lacks type description

export type Vacancy = {
  name: string;
  description: string;

  employer: {
    name: string;
    logo_urls: { [key: string]: string } | null;
  } | null;

  id: string;

  employment: {
    name: string;
  } | null;

  experience: {
    name: string;
  } | null;

  salary: {
    from: number;
    currency: 'RUR' | string;
    to: number;
  } | null;

  published_at: string;

  address: {
    city: string | null;
    street: string | null;
    building: string | null;
    raw: string | null;
    lat: number | null;
    lng: number | null;
  } | null;

  key_skills: { name: string }[];
};
