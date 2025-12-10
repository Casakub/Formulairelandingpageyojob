/**
 * 🌍 Traductions du champ contactType pour toutes les langues
 * À fusionner avec les traductions existantes via l'API /landing/update
 */

export const contactTypeTranslations: Record<string, {
  label: string;
  placeholder: string;
  options: {
    client: string;
    agency: string;
    interim: string;
    other: string;
  };
}> = {
  // Français
  fr: {
    label: 'Vous êtes',
    placeholder: 'Sélectionnez votre profil',
    options: {
      client: 'Client / Entreprise',
      agency: 'Agence de travail temporaire',
      interim: 'Intérimaire',
      other: 'Autre',
    },
  },
  
  // Anglais
  en: {
    label: 'You are',
    placeholder: 'Select your profile',
    options: {
      client: 'Client / Company',
      agency: 'Temporary work agency',
      interim: 'Temporary worker',
      other: 'Other',
    },
  },
  
  // Allemand
  de: {
    label: 'Sie sind',
    placeholder: 'Wählen Sie Ihr Profil',
    options: {
      client: 'Kunde / Unternehmen',
      agency: 'Zeitarbeitsfirma',
      interim: 'Zeitarbeiter',
      other: 'Andere',
    },
  },
  
  // Espagnol
  es: {
    label: 'Usted es',
    placeholder: 'Seleccione su perfil',
    options: {
      client: 'Cliente / Empresa',
      agency: 'Agencia de trabajo temporal',
      interim: 'Trabajador temporal',
      other: 'Otro',
    },
  },
  
  // Italien
  it: {
    label: 'Lei è',
    placeholder: 'Seleziona il tuo profilo',
    options: {
      client: 'Cliente / Azienda',
      agency: 'Agenzia di lavoro temporaneo',
      interim: 'Lavoratore temporaneo',
      other: 'Altro',
    },
  },
  
  // Portugais
  pt: {
    label: 'Você é',
    placeholder: 'Selecione seu perfil',
    options: {
      client: 'Cliente / Empresa',
      agency: 'Agência de trabalho temporário',
      interim: 'Trabalhador temporário',
      other: 'Outro',
    },
  },
  
  // Néerlandais
  nl: {
    label: 'U bent',
    placeholder: 'Selecteer uw profiel',
    options: {
      client: 'Klant / Bedrijf',
      agency: 'Uitzendbureau',
      interim: 'Uitzendkracht',
      other: 'Ander',
    },
  },
  
  // Polonais
  pl: {
    label: 'Jesteś',
    placeholder: 'Wybierz swój profil',
    options: {
      client: 'Klient / Firma',
      agency: 'Agencja pracy tymczasowej',
      interim: 'Pracownik tymczasowy',
      other: 'Inny',
    },
  },
  
  // Roumain
  ro: {
    label: 'Sunteți',
    placeholder: 'Selectați profilul dvs',
    options: {
      client: 'Client / Companie',
      agency: 'Agenție de muncă temporară',
      interim: 'Lucrător temporar',
      other: 'Altul',
    },
  },
  
  // Tchèque
  cs: {
    label: 'Jste',
    placeholder: 'Vyberte svůj profil',
    options: {
      client: 'Klient / Společnost',
      agency: 'Agentura dočasné práce',
      interim: 'Dočasný pracovník',
      other: 'Jiný',
    },
  },
  
  // Hongrois
  hu: {
    label: 'Ön',
    placeholder: 'Válassza ki profilját',
    options: {
      client: 'Ügyfél / Vállalat',
      agency: 'Munkaerő-kölcsönző ügynökség',
      interim: 'Ideiglenes munkavállaló',
      other: 'Egyéb',
    },
  },
  
  // Bulgare
  bg: {
    label: 'Вие сте',
    placeholder: 'Изберете вашия профил',
    options: {
      client: 'Клиент / Компания',
      agency: 'Агенция за временна заетост',
      interim: 'Временен работник',
      other: 'Друго',
    },
  },
  
  // Grec
  el: {
    label: 'Είστε',
    placeholder: 'Επιλέξτε το προφίλ σας',
    options: {
      client: 'Πελάτης / Εταιρεία',
      agency: 'Πρακτορείο προσωρινής εργασίας',
      interim: 'Προσωρινός εργαζόμενος',
      other: 'Άλλο',
    },
  },
  
  // Suédois
  sv: {
    label: 'Du är',
    placeholder: 'Välj din profil',
    options: {
      client: 'Kund / Företag',
      agency: 'Bemanningsföretag',
      interim: 'Timanställd',
      other: 'Annat',
    },
  },
  
  // Danois
  da: {
    label: 'Du er',
    placeholder: 'Vælg din profil',
    options: {
      client: 'Kunde / Virksomhed',
      agency: 'Vikarbureau',
      interim: 'Vikar',
      other: 'Andet',
    },
  },
  
  // Finnois
  fi: {
    label: 'Olet',
    placeholder: 'Valitse profiilisi',
    options: {
      client: 'Asiakas / Yritys',
      agency: 'Työvoimatoimisto',
      interim: 'Vuokratyöntekijä',
      other: 'Muu',
    },
  },
  
  // Slovaque
  sk: {
    label: 'Ste',
    placeholder: 'Vyberte svoj profil',
    options: {
      client: 'Klient / Spoločnosť',
      agency: 'Agentúra dočasnej práce',
      interim: 'Dočasný pracovník',
      other: 'Iný',
    },
  },
  
  // Croate
  hr: {
    label: 'Vi ste',
    placeholder: 'Odaberite svoj profil',
    options: {
      client: 'Klijent / Tvrtka',
      agency: 'Agencija za privremeni rad',
      interim: 'Privremeni radnik',
      other: 'Ostalo',
    },
  },
  
  // Slovène
  sl: {
    label: 'Vi ste',
    placeholder: 'Izberite svoj profil',
    options: {
      client: 'Stranka / Podjetje',
      agency: 'Agencija za začasno delo',
      interim: 'Začasni delavec',
      other: 'Drugo',
    },
  },
  
  // Lituanien
  lt: {
    label: 'Jūs esate',
    placeholder: 'Pasirinkite savo profilį',
    options: {
      client: 'Klientas / Įmonė',
      agency: 'Laikino įdarbinimo agentūra',
      interim: 'Laikinas darbuotojas',
      other: 'Kita',
    },
  },
  
  // Letton
  lv: {
    label: 'Jūs esat',
    placeholder: 'Izvēlieties savu profilu',
    options: {
      client: 'Klients / Uzņēmums',
      agency: 'Pagaidu darba aģentūra',
      interim: 'Pagaidu darbinieks',
      other: 'Cits',
    },
  },
  
  // Estonien
  et: {
    label: 'Te olete',
    placeholder: 'Valige oma profiil',
    options: {
      client: 'Klient / Ettevõte',
      agency: 'Ajutise töö agentuur',
      interim: 'Ajutine töötaja',
      other: 'Muu',
    },
  },
  
  // Irlandais
  ga: {
    label: 'Is tú',
    placeholder: 'Roghnaigh do phróifíl',
    options: {
      client: 'Cliant / Cuideachta',
      agency: 'Gníomhaireacht oibre shealadaigh',
      interim: 'Oibrí sealadach',
      other: 'Eile',
    },
  },
  
  // Maltais
  mt: {
    label: 'Inti',
    placeholder: 'Agħżel il-profil tiegħek',
    options: {
      client: 'Klijent / Kumpanija',
      agency: 'Aġenzija ta\' xogħol temporanju',
      interim: 'Ħaddiem temporanju',
      other: 'Oħra',
    },
  },
};
