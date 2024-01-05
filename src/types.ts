interface Country {
  name: {
    nativeName: {
      common: string;
    };
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tld: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  flags: {
    png: string;
  };
}


export default Country