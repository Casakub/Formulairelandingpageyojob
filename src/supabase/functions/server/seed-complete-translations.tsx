import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

// Full translations for all 18 missing texts in 23 languages (fr + 22 others)
const COMPLETE_TRANSLATIONS = [
  // ========== SECTION 6 CONTACT ==========
  {
    textId: 'section6.consent.contact.title',
    category: 'ui',
    translations: {
      fr: { text: "J'autorise YoJob à me recontacter", status: 'validated' },
      en: { text: "I authorize YoJob to contact me again", status: 'auto-api' },
      de: { text: "Ich erlaube YoJob, mich erneut zu kontaktieren", status: 'auto-api' },
      es: { text: "Autorizo a YoJob a volver a contactarme", status: 'auto-api' },
      it: { text: "Autorizzo YoJob a ricontattarmi", status: 'auto-api' },
      pl: { text: "Upoważniam YoJob do ponownego kontaktu", status: 'auto-api' },
      ro: { text: "Autorizez YoJob să mă contacteze din nou", status: 'auto-api' },
      nl: { text: "Ik geef YoJob toestemming om opnieuw contact op te nemen", status: 'auto-api' },
      pt: { text: "Autorizo a YoJob a contactar-me novamente", status: 'auto-api' },
      cs: { text: "Souhlasím, aby mě YoJob znovu kontaktoval", status: 'auto-api' },
      hu: { text: "Engedélyezem a YoJob számára, hogy újra kapcsolatba lépjen velem", status: 'auto-api' },
      sv: { text: "Jag godkänner att YoJob kontaktar mig igen", status: 'auto-api' },
      bg: { text: "Разрешавам на YoJob да се свърже с мен отново", status: 'auto-api' },
      el: { text: "Εξουσιοδοτώ την YoJob να επικοινωνήσει ξανά μαζί μου", status: 'auto-api' },
      sk: { text: "Súhlasím, aby ma YoJob znovu kontaktoval", status: 'auto-api' },
      da: { text: "Jeg giver YoJob tilladelse til at kontakte mig igen", status: 'auto-api' },
      fi: { text: "Valtuutan YoJobin ottamaan minuun yhteyttä uudelleen", status: 'auto-api' },
      hr: { text: "Odobravam da me YoJob ponovno kontaktira", status: 'auto-api' },
      lt: { text: "Leidžiu YoJob vėl su manimi susisiekti", status: 'auto-api' },
      lv: { text: "Es atļauju YoJob sazināties ar mani vēlreiz", status: 'auto-api' },
      sl: { text: "Dovoljujem YoJob, da me ponovno kontaktira", status: 'auto-api' },
      et: { text: "Luban YoJobil minuga uuesti ühendust võtta", status: 'auto-api' },
      no: { text: "Jeg godkjenner at YoJob kontakter meg igjen", status: 'auto-api' }
    }
  },
  {
    textId: 'section6.consent.contact.description',
    category: 'ui',
    translations: {
      fr: { text: "Pour discuter de vos besoins et vous présenter notre solution", status: 'validated' },
      en: { text: "To discuss your needs and present our solution", status: 'auto-api' },
      de: { text: "Um Ihre Bedürfnisse zu besprechen und unsere Lösung vorzustellen", status: 'auto-api' },
      es: { text: "Para discutir sus necesidades y presentar nuestra solución", status: 'auto-api' },
      it: { text: "Per discutere le vostre esigenze e presentare la nostra soluzione", status: 'auto-api' },
      pl: { text: "Aby omówić Twoje potrzeby i zaprezentować nasze rozwiązanie", status: 'auto-api' },
      ro: { text: "Pentru a discuta despre nevoile dvs. și a vă prezenta soluția noastră", status: 'auto-api' },
      nl: { text: "Om uw behoeften te bespreken en onze oplossing voor te stellen", status: 'auto-api' },
      pt: { text: "Para discutir as suas necessidades e apresentar a nossa solução", status: 'auto-api' },
      cs: { text: "Abychom mohli diskutovat o vašich potřebách a představit naše řešení", status: 'auto-api' },
      hu: { text: "Hogy megbeszéljük az Ön igényeit és bemutassuk megoldásunkat", status: 'auto-api' },
      sv: { text: "För att diskutera dina behov och presentera vår lösning", status: 'auto-api' },
      bg: { text: "За да обсъдим вашите нужди и да представим нашето решение", status: 'auto-api' },
      el: { text: "Για να συζητήσουμε τις ανάγκες σας και να παρουσιάσουμε τη λύση μας", status: 'auto-api' },
      sk: { text: "Aby sme mohli diskutovať o vašich potrebách a predstaviť naše riešenie", status: 'auto-api' },
      da: { text: "For at diskutere dine behov og præsentere vores løsning", status: 'auto-api' },
      fi: { text: "Keskustellaksemme tarpeistasi ja esitelläksemme ratkaisumme", status: 'auto-api' },
      hr: { text: "Kako bismo razgovarali o vašim potrebama i predstavili naše rješenje", status: 'auto-api' },
      lt: { text: "Aptarti jūsų poreikius ir pristatyti mūsų sprendimą", status: 'auto-api' },
      lv: { text: "Lai apspriestu jūsu vajadzības un iepazīstinātu ar mūsu risinājumu", status: 'auto-api' },
      sl: { text: "Za razpravo o vaših potrebah in predstavitev naše rešitve", status: 'auto-api' },
      et: { text: "Teie vajaduste arutamiseks ja meie lahenduse tutvustamiseks", status: 'auto-api' },
      no: { text: "For å diskutere dine behov og presentere vår løsning", status: 'auto-api' }
    }
  },
  {
    textId: 'section6.consent.report.title',
    category: 'ui',
    translations: {
      fr: { text: "Je souhaite recevoir le rapport de l'étude 2025", status: 'validated' },
      en: { text: "I would like to receive the 2025 study report", status: 'auto-api' },
      de: { text: "Ich möchte den Studienbericht 2025 erhalten", status: 'auto-api' },
      es: { text: "Deseo recibir el informe del estudio 2025", status: 'auto-api' },
      it: { text: "Desidero ricevere il rapporto dello studio 2025", status: 'auto-api' },
      pl: { text: "Chciałbym otrzymać raport z badania 2025", status: 'auto-api' },
      ro: { text: "Doresc să primesc raportul studiului 2025", status: 'auto-api' },
      nl: { text: "Ik wil het onderzoeksrapport 2025 ontvangen", status: 'auto-api' },
      pt: { text: "Desejo receber o relatório do estudo 2025", status: 'auto-api' },
      cs: { text: "Přeji si obdržet zprávu o studii 2025", status: 'auto-api' },
      hu: { text: "Szeretném megkapni a 2025-ös tanulmány jelentését", status: 'auto-api' },
      sv: { text: "Jag vill ta emot studierapporten 2025", status: 'auto-api' },
      bg: { text: "Искам да получа доклада от проучването 2025", status: 'auto-api' },
      el: { text: "Θα ήθελα να λάβω την αναφορά μελέτης 2025", status: 'auto-api' },
      sk: { text: "Želám si dostať správu o štúdii 2025", status: 'auto-api' },
      da: { text: "Jeg vil gerne modtage studierapporten 2025", status: 'auto-api' },
      fi: { text: "Haluan vastaanottaa vuoden 2025 tutkimusraportin", status: 'auto-api' },
      hr: { text: "Želim primiti izvješće studije 2025", status: 'auto-api' },
      lt: { text: "Norėčiau gauti 2025 m. tyrimo ataskaitą", status: 'auto-api' },
      lv: { text: "Vēlos saņemt 2025. gada pētījuma ziņojumu", status: 'auto-api' },
      sl: { text: "Želim prejeti poročilo o študiji 2025", status: 'auto-api' },
      et: { text: "Soovin saada 2025. aasta uuringu aruande", status: 'auto-api' },
      no: { text: "Jeg ønsker å motta studierapporten 2025", status: 'auto-api' }
    }
  },
  {
    textId: 'section6.consent.report.description',
    category: 'ui',
    translations: {
      fr: { text: "Recevez en avant-première les insights du marché européen", status: 'validated' },
      en: { text: "Receive early insights into the European market", status: 'auto-api' },
      de: { text: "Erhalten Sie vorab Einblicke in den europäischen Markt", status: 'auto-api' },
      es: { text: "Reciba información anticipada sobre el mercado europeo", status: 'auto-api' },
      it: { text: "Ricevi in anteprima le informazioni sul mercato europeo", status: 'auto-api' },
      pl: { text: "Otrzymaj wcześniejszy dostęp do analiz rynku europejskiego", status: 'auto-api' },
      ro: { text: "Primiți în premieră informații despre piața europeană", status: 'auto-api' },
      nl: { text: "Ontvang als eerste inzichten in de Europese markt", status: 'auto-api' },
      pt: { text: "Receba em primeira mão insights sobre o mercado europeu", status: 'auto-api' },
      cs: { text: "Získejte přednostně informace o evropském trhu", status: 'auto-api' },
      hu: { text: "Kapja meg elsőként az európai piac elemzéseit", status: 'auto-api' },
      sv: { text: "Ta emot tidiga insikter om den europeiska marknaden", status: 'auto-api' },
      bg: { text: "Получете предварително анализи на европейския пазар", status: 'auto-api' },
      el: { text: "Λάβετε πρώτοι πληροφορίες για την ευρωπαϊκή αγορά", status: 'auto-api' },
      sk: { text: "Získajte vopred informácie o európskom trhu", status: 'auto-api' },
      da: { text: "Modtag tidlige indsigter i det europæiske marked", status: 'auto-api' },
      fi: { text: "Vastaanota ennakkotietoa Euroopan markkinoista", status: 'auto-api' },
      hr: { text: "Primite rano uvide u europsko tržište", status: 'auto-api' },
      lt: { text: "Gaukite pirmieji įžvalgas apie Europos rinką", status: 'auto-api' },
      lv: { text: "Saņemiet agrīnu ieskatu Eiropas tirgū", status: 'auto-api' },
      sl: { text: "Prejmite prednostne vpoglede v evropski trg", status: 'auto-api' },
      et: { text: "Saage esimesena teadmisi Euroopa turust", status: 'auto-api' },
      no: { text: "Motta tidlige innsikter i det europeiske markedet", status: 'auto-api' }
    }
  },
  {
    textId: 'section6.rgpd',
    category: 'ui',
    translations: {
      fr: { text: "Vos données sont sécurisées et conformes au RGPD. Elles ne seront jamais vendues à des tiers.", status: 'validated' },
      en: { text: "Your data is secure and GDPR compliant. It will never be sold to third parties.", status: 'auto-api' },
      de: { text: "Ihre Daten sind sicher und DSGVO-konform. Sie werden niemals an Dritte verkauft.", status: 'auto-api' },
      es: { text: "Sus datos están seguros y cumplen con el RGPD. Nunca se venderán a terceros.", status: 'auto-api' },
      it: { text: "I vostri dati sono sicuri e conformi al GDPR. Non saranno mai venduti a terzi.", status: 'auto-api' },
      pl: { text: "Twoje dane są bezpieczne i zgodne z RODO. Nigdy nie zostaną sprzedane osobom trzecim.", status: 'auto-api' },
      ro: { text: "Datele dvs. sunt securizate și conforme cu GDPR. Nu vor fi niciodată vândute terților.", status: 'auto-api' },
      nl: { text: "Uw gegevens zijn veilig en AVG-conform. Ze zullen nooit aan derden worden verkocht.", status: 'auto-api' },
      pt: { text: "Os seus dados são seguros e conformes ao RGPD. Nunca serão vendidos a terceiros.", status: 'auto-api' },
      cs: { text: "Vaše data jsou zabezpečená a v souladu s GDPR. Nikdy nebudou prodána třetím stranám.", status: 'auto-api' },
      hu: { text: "Az Ön adatai biztonságosak és megfelelnek a GDPR előírásainak. Soha nem kerülnek értékesítésre harmadik félnek.", status: 'auto-api' },
      sv: { text: "Dina uppgifter är säkra och GDPR-kompatibla. De kommer aldrig att säljas till tredje part.", status: 'auto-api' },
      bg: { text: "Вашите данни са защитени и съответстват на GDPR. Те никога няма да бъдат продадени на трети страни.", status: 'auto-api' },
      el: { text: "Τα δεδομένα σας είναι ασφαλή και συμμορφώνονται με το GDPR. Δεν θα πωληθούν ποτέ σε τρίτους.", status: 'auto-api' },
      sk: { text: "Vaše údaje sú zabezpečené a v súlade s GDPR. Nikdy nebudú predané tretím stranám.", status: 'auto-api' },
      da: { text: "Dine data er sikre og GDPR-kompatible. De vil aldrig blive solgt til tredjeparter.", status: 'auto-api' },
      fi: { text: "Tietosi ovat turvassa ja GDPR-yhteensopivia. Niitä ei koskaan myydä kolmansille osapuolille.", status: 'auto-api' },
      hr: { text: "Vaši podaci su sigurni i usklađeni s GDPR-om. Nikada neće biti prodani trećim stranama.", status: 'auto-api' },
      lt: { text: "Jūsų duomenys yra saugūs ir atitinka BDAR reikalavimus. Jie niekada nebus parduoti trečiosioms šalims.", status: 'auto-api' },
      lv: { text: "Jūsu dati ir droši un atbilst VDAR prasībām. Tie nekad netiks pārdoti trešajām personām.", status: 'auto-api' },
      sl: { text: "Vaši podatki so varni in skladni z GDPR. Nikoli ne bodo prodani tretjim osebam.", status: 'auto-api' },
      et: { text: "Teie andmed on turvalised ja vastavad GDPR-ile. Neid ei müüda kunagi kolmandatele osapooltele.", status: 'auto-api' },
      no: { text: "Dine data er sikre og GDPR-kompatible. De vil aldri bli solgt til tredjeparter.", status: 'auto-api' }
    }
  },
  
  // ========== CONFIRMATION TOAST ==========
  {
    textId: 'confirmation.toast.title',
    category: 'ui',
    translations: {
      fr: { text: "Merci ! Votre réponse a été enregistrée.", status: 'validated' },
      en: { text: "Thank you! Your response has been recorded.", status: 'auto-api' },
      de: { text: "Danke! Ihre Antwort wurde gespeichert.", status: 'auto-api' },
      es: { text: "¡Gracias! Su respuesta ha sido registrada.", status: 'auto-api' },
      it: { text: "Grazie! La tua risposta è stata registrata.", status: 'auto-api' },
      pl: { text: "Dziękujemy! Twoja odpowiedź została zarejestrowana.", status: 'auto-api' },
      ro: { text: "Mulțumim! Răspunsul dvs. a fost înregistrat.", status: 'auto-api' },
      nl: { text: "Bedankt! Uw antwoord is opgeslagen.", status: 'auto-api' },
      pt: { text: "Obrigado! A sua resposta foi registada.", status: 'auto-api' },
      cs: { text: "Děkujeme! Vaše odpověď byla zaznamenána.", status: 'auto-api' },
      hu: { text: "Köszönjük! A válaszát rögzítettük.", status: 'auto-api' },
      sv: { text: "Tack! Ditt svar har registrerats.", status: 'auto-api' },
      bg: { text: "Благодаря! Вашият отговор е записан.", status: 'auto-api' },
      el: { text: "Ευχαριστούμε! Η απάντησή σας έχει καταγραφεί.", status: 'auto-api' },
      sk: { text: "Ďakujeme! Vaša odpoveď bola zaznamenaná.", status: 'auto-api' },
      da: { text: "Tak! Dit svar er registreret.", status: 'auto-api' },
      fi: { text: "Kiitos! Vastauksesi on tallennettu.", status: 'auto-api' },
      hr: { text: "Hvala! Vaš odgovor je zabilježen.", status: 'auto-api' },
      lt: { text: "Ačiū! Jūsų atsakymas buvo užfiksuotas.", status: 'auto-api' },
      lv: { text: "Paldies! Jūsu atbilde ir reģistrēta.", status: 'auto-api' },
      sl: { text: "Hvala! Vaš odgovor je bil zabeležen.", status: 'auto-api' },
      et: { text: "Täname! Teie vastus on salvestatud.", status: 'auto-api' },
      no: { text: "Takk! Ditt svar er registrert.", status: 'auto-api' }
    }
  },
  {
    textId: 'confirmation.toast.description',
    category: 'ui',
    translations: {
      fr: { text: "Vous recevrez une analyse par email si vous avez coché l'option.", status: 'validated' },
      en: { text: "You will receive an analysis by email if you checked the option.", status: 'auto-api' },
      de: { text: "Sie erhalten eine Analyse per E-Mail, wenn Sie die Option aktiviert haben.", status: 'auto-api' },
      es: { text: "Recibirá un análisis por correo electrónico si marcó la opción.", status: 'auto-api' },
      it: { text: "Riceverai un'analisi via email se hai selezionato l'opzione.", status: 'auto-api' },
      pl: { text: "Otrzymasz analizę e-mailem, jeśli zaznaczyłeś opcję.", status: 'auto-api' },
      ro: { text: "Veți primi o analiză prin email dacă ați bifat opțiunea.", status: 'auto-api' },
      nl: { text: "U ontvangt een analyse per e-mail als u de optie hebt aangevinkt.", status: 'auto-api' },
      pt: { text: "Receberá uma análise por email se selecionou a opção.", status: 'auto-api' },
      cs: { text: "Pokud jste zaškrtli možnost, obdržíte analýzu e-mailem.", status: 'auto-api' },
      hu: { text: "E-mailben kap elemzést, ha bejelölte az opciót.", status: 'auto-api' },
      sv: { text: "Du kommer att få en analys via e-post om du kryssade i alternativet.", status: 'auto-api' },
      bg: { text: "Ще получите анализ по имейл, ако сте отметнали опцията.", status: 'auto-api' },
      el: { text: "Θα λάβετε ανάλυση μέσω email εάν επιλέξατε την επιλογή.", status: 'auto-api' },
      sk: { text: "Ak ste zaškrtli možnosť, dostanete analýzu e-mailom.", status: 'auto-api' },
      da: { text: "Du vil modtage en analyse via e-mail, hvis du markerede muligheden.", status: 'auto-api' },
      fi: { text: "Saat analyysin sähköpostitse, jos valitsit vaihtoehdon.", status: 'auto-api' },
      hr: { text: "Primit ćete analizu putem emaila ako ste označili opciju.", status: 'auto-api' },
      lt: { text: "Gausite analizę el. paštu, jei pažymėjote parinktį.", status: 'auto-api' },
      lv: { text: "Jūs saņemsiet analīzi pa e-pastu, ja atzīmējāt opciju.", status: 'auto-api' },
      sl: { text: "Po e-pošti boste prejeli analizo, če ste označili možnost.", status: 'auto-api' },
      et: { text: "Saate e-posti teel analüüsi, kui märkisite valiku.", status: 'auto-api' },
      no: { text: "Du vil motta en analyse via e-post hvis du krysset av for alternativet.", status: 'auto-api' }
    }
  },
  
  // ========== CONFIRMATION SCREEN ==========
  {
    textId: 'confirmation.title',
    category: 'ui',
    translations: {
      fr: { text: "Merci pour votre participation ! 🙏", status: 'validated' },
      en: { text: "Thank you for your participation! 🙏", status: 'auto-api' },
      de: { text: "Vielen Dank für Ihre Teilnahme! 🙏", status: 'auto-api' },
      es: { text: "¡Gracias por su participación! 🙏", status: 'auto-api' },
      it: { text: "Grazie per la tua partecipazione! 🙏", status: 'auto-api' },
      pl: { text: "Dziękujemy za udział! 🙏", status: 'auto-api' },
      ro: { text: "Mulțumim pentru participare! 🙏", status: 'auto-api' },
      nl: { text: "Bedankt voor uw deelname! 🙏", status: 'auto-api' },
      pt: { text: "Obrigado pela sua participação! 🙏", status: 'auto-api' },
      cs: { text: "Děkujeme za vaši účast! 🙏", status: 'auto-api' },
      hu: { text: "Köszönjük a részvételt! 🙏", status: 'auto-api' },
      sv: { text: "Tack för ditt deltagande! 🙏", status: 'auto-api' },
      bg: { text: "Благодарим за участието! 🙏", status: 'auto-api' },
      el: { text: "Ευχαριστούμε για τη συμμετοχή σας! 🙏", status: 'auto-api' },
      sk: { text: "Ďakujeme za vašu účasť! 🙏", status: 'auto-api' },
      da: { text: "Tak for din deltagelse! 🙏", status: 'auto-api' },
      fi: { text: "Kiitos osallistumisestasi! 🙏", status: 'auto-api' },
      hr: { text: "Hvala na sudjelovanju! 🙏", status: 'auto-api' },
      lt: { text: "Dėkojame už dalyvavimą! 🙏", status: 'auto-api' },
      lv: { text: "Paldies par piedalīšanos! 🙏", status: 'auto-api' },
      sl: { text: "Hvala za sodelovanje! 🙏", status: 'auto-api' },
      et: { text: "Täname osalemise eest! 🙏", status: 'auto-api' },
      no: { text: "Takk for deltakelsen! 🙏", status: 'auto-api' }
    }
  },
  {
    textId: 'confirmation.description',
    category: 'ui',
    translations: {
      fr: { text: "Votre avis est précieux et contribue à façonner l'avenir de YoJob.", status: 'validated' },
      en: { text: "Your feedback is valuable and helps shape the future of YoJob.", status: 'auto-api' },
      de: { text: "Ihre Meinung ist wertvoll und trägt zur Gestaltung der Zukunft von YoJob bei.", status: 'auto-api' },
      es: { text: "Su opinión es valiosa y contribuye a dar forma al futuro de YoJob.", status: 'auto-api' },
      it: { text: "Il tuo parere è prezioso e contribuisce a plasmare il futuro di YoJob.", status: 'auto-api' },
      pl: { text: "Twoja opinia jest cenna i pomaga kształtować przyszłość YoJob.", status: 'auto-api' },
      ro: { text: "Părerea dvs. este valoroasă și contribuie la modelarea viitorului YoJob.", status: 'auto-api' },
      nl: { text: "Uw mening is waardevol en helpt de toekomst van YoJob vorm te geven.", status: 'auto-api' },
      pt: { text: "A sua opinião é valiosa e contribui para moldar o futuro da YoJob.", status: 'auto-api' },
      cs: { text: "Váš názor je cenný a pomáhá utvářet budoucnost YoJob.", status: 'auto-api' },
      hu: { text: "Az Ön véleménye értékes és segít a YoJob jövőjének alakításában.", status: 'auto-api' },
      sv: { text: "Din åsikt är värdefull och bidrar till att forma YoJobs framtid.", status: 'auto-api' },
      bg: { text: "Вашето мнение е ценно и допринася за оформянето на бъдещето на YoJob.", status: 'auto-api' },
      el: { text: "Η γνώμη σας είναι πολύτιμη και συμβάλλει στη διαμόρφωση του μέλλοντος της YoJob.", status: 'auto-api' },
      sk: { text: "Váš názor je cenný a pomáha utvárať budúcnosť YoJob.", status: 'auto-api' },
      da: { text: "Din mening er værdifuld og hjælper med at forme fremtiden for YoJob.", status: 'auto-api' },
      fi: { text: "Mielipiteesi on arvokas ja auttaa muokkaamaan YoJobin tulevaisuutta.", status: 'auto-api' },
      hr: { text: "Vaše mišljenje je vrijedno i doprinosi oblikovanju budućnosti YoJob.", status: 'auto-api' },
      lt: { text: "Jūsų nuomonė yra vertinga ir padeda formuoti YoJob ateitį.", status: 'auto-api' },
      lv: { text: "Jūsu viedoklis ir vērtīgs un palīdz veidot YoJob nākotni.", status: 'auto-api' },
      sl: { text: "Vaše mnenje je dragoceno in prispeva k oblikovanju prihodnosti YoJob.", status: 'auto-api' },
      et: { text: "Teie arvamus on väärtuslik ja aitab kujundada YoJobi tulevikku.", status: 'auto-api' },
      no: { text: "Din mening er verdifull og bidrar til å forme fremtiden for YoJob.", status: 'auto-api' }
    }
  },
  {
    textId: 'confirmation.reward.report.title',
    category: 'ui',
    translations: {
      fr: { text: 'Rapport "Tendances 2025"', status: 'validated' },
      en: { text: '"2025 Trends" Report', status: 'auto-api' },
      de: { text: 'Bericht "Trends 2025"', status: 'auto-api' },
      es: { text: 'Informe "Tendencias 2025"', status: 'auto-api' },
      it: { text: 'Rapporto "Tendenze 2025"', status: 'auto-api' },
      pl: { text: 'Raport "Trendy 2025"', status: 'auto-api' },
      ro: { text: 'Raport "Tendințe 2025"', status: 'auto-api' },
      nl: { text: 'Rapport "Trends 2025"', status: 'auto-api' },
      pt: { text: 'Relatório "Tendências 2025"', status: 'auto-api' },
      cs: { text: 'Zpráva "Trendy 2025"', status: 'auto-api' },
      hu: { text: '"2025 trendek" jelentés', status: 'auto-api' },
      sv: { text: 'Rapport "Trender 2025"', status: 'auto-api' },
      bg: { text: 'Доклад "Тенденции 2025"', status: 'auto-api' },
      el: { text: 'Αναφορά "Τάσεις 2025"', status: 'auto-api' },
      sk: { text: 'Správa "Trendy 2025"', status: 'auto-api' },
      da: { text: 'Rapport "Tendenser 2025"', status: 'auto-api' },
      fi: { text: 'Raportti "Trendit 2025"', status: 'auto-api' },
      hr: { text: 'Izvješće "Trendovi 2025"', status: 'auto-api' },
      lt: { text: 'Ataskaita "2025 m. tendencijos"', status: 'auto-api' },
      lv: { text: 'Ziņojums "2025. gada tendences"', status: 'auto-api' },
      sl: { text: 'Poročilo "Trendi 2025"', status: 'auto-api' },
      et: { text: 'Aruanne "2025 trendid"', status: 'auto-api' },
      no: { text: 'Rapport "Trender 2025"', status: 'auto-api' }
    }
  },
  {
    textId: 'confirmation.reward.report.description',
    category: 'ui',
    translations: {
      fr: { text: "Envoyé sous 3 semaines", status: 'validated' },
      en: { text: "Sent within 3 weeks", status: 'auto-api' },
      de: { text: "Innerhalb von 3 Wochen gesendet", status: 'auto-api' },
      es: { text: "Enviado en 3 semanas", status: 'auto-api' },
      it: { text: "Inviato entro 3 settimane", status: 'auto-api' },
      pl: { text: "Wysłane w ciągu 3 tygodni", status: 'auto-api' },
      ro: { text: "Trimis în 3 săptămâni", status: 'auto-api' },
      nl: { text: "Verzonden binnen 3 weken", status: 'auto-api' },
      pt: { text: "Enviado em 3 semanas", status: 'auto-api' },
      cs: { text: "Odesláno do 3 týdnů", status: 'auto-api' },
      hu: { text: "3 héten belül elküldve", status: 'auto-api' },
      sv: { text: "Skickas inom 3 veckor", status: 'auto-api' },
      bg: { text: "Изпратено в рамките на 3 седмици", status: 'auto-api' },
      el: { text: "Αποστολή εντός 3 εβδομάδων", status: 'auto-api' },
      sk: { text: "Odoslané do 3 týždňov", status: 'auto-api' },
      da: { text: "Sendt inden for 3 uger", status: 'auto-api' },
      fi: { text: "Lähetetty 3 viikon kuluessa", status: 'auto-api' },
      hr: { text: "Poslano u roku od 3 tjedna", status: 'auto-api' },
      lt: { text: "Išsiųsta per 3 savaites", status: 'auto-api' },
      lv: { text: "Nosūtīts 3 nedēļu laikā", status: 'auto-api' },
      sl: { text: "Poslano v 3 tednih", status: 'auto-api' },
      et: { text: "Saadetud 3 nädala jooksul", status: 'auto-api' },
      no: { text: "Sendt innen 3 uker", status: 'auto-api' }
    }
  },
  {
    textId: 'confirmation.reward.earlyaccess.title',
    category: 'ui',
    translations: {
      fr: { text: "Early Access YoJob", status: 'validated' },
      en: { text: "YoJob Early Access", status: 'auto-api' },
      de: { text: "YoJob Frühzugang", status: 'auto-api' },
      es: { text: "Acceso anticipado a YoJob", status: 'auto-api' },
      it: { text: "Accesso anticipato a YoJob", status: 'auto-api' },
      pl: { text: "Wczesny dostęp do YoJob", status: 'auto-api' },
      ro: { text: "Acces anticipat YoJob", status: 'auto-api' },
      nl: { text: "Vroege toegang tot YoJob", status: 'auto-api' },
      pt: { text: "Acesso antecipado YoJob", status: 'auto-api' },
      cs: { text: "Přednostní přístup k YoJob", status: 'auto-api' },
      hu: { text: "YoJob korai hozzáférés", status: 'auto-api' },
      sv: { text: "Tidig åtkomst till YoJob", status: 'auto-api' },
      bg: { text: "Ранен достъп до YoJob", status: 'auto-api' },
      el: { text: "Πρόωρη πρόσβαση στο YoJob", status: 'auto-api' },
      sk: { text: "Prednostný prístup k YoJob", status: 'auto-api' },
      da: { text: "Tidlig adgang til YoJob", status: 'auto-api' },
      fi: { text: "Varhainen pääsy YoJobiin", status: 'auto-api' },
      hr: { text: "Rani pristup YoJob", status: 'auto-api' },
      lt: { text: "Ankstyvoji prieiga prie YoJob", status: 'auto-api' },
      lv: { text: "Agrīna piekļuve YoJob", status: 'auto-api' },
      sl: { text: "Zgodnji dostop do YoJob", status: 'auto-api' },
      et: { text: "Varajane juurdepääs YoJobile", status: 'auto-api' },
      no: { text: "Tidlig tilgang til YoJob", status: 'auto-api' }
    }
  },
  {
    textId: 'confirmation.reward.earlyaccess.description',
    category: 'ui',
    translations: {
      fr: { text: "Top 100 répondants", status: 'validated' },
      en: { text: "Top 100 respondents", status: 'auto-api' },
      de: { text: "Top 100 Teilnehmer", status: 'auto-api' },
      es: { text: "Top 100 participantes", status: 'auto-api' },
      it: { text: "Top 100 partecipanti", status: 'auto-api' },
      pl: { text: "Top 100 uczestników", status: 'auto-api' },
      ro: { text: "Top 100 participanți", status: 'auto-api' },
      nl: { text: "Top 100 deelnemers", status: 'auto-api' },
      pt: { text: "Top 100 participantes", status: 'auto-api' },
      cs: { text: "Top 100 účastníků", status: 'auto-api' },
      hu: { text: "Top 100 résztvevő", status: 'auto-api' },
      sv: { text: "Topp 100 deltagare", status: 'auto-api' },
      bg: { text: "Топ 100 участници", status: 'auto-api' },
      el: { text: "Κορυφαίοι 100 συμμετέχοντες", status: 'auto-api' },
      sk: { text: "Top 100 účastníkov", status: 'auto-api' },
      da: { text: "Top 100 deltagere", status: 'auto-api' },
      fi: { text: "Top 100 osallistujaa", status: 'auto-api' },
      hr: { text: "Top 100 sudionika", status: 'auto-api' },
      lt: { text: "Top 100 dalyvių", status: 'auto-api' },
      lv: { text: "Top 100 dalībnieki", status: 'auto-api' },
      sl: { text: "Top 100 udeležencev", status: 'auto-api' },
      et: { text: "Top 100 osalejat", status: 'auto-api' },
      no: { text: "Topp 100 deltakere", status: 'auto-api' }
    }
  },
  {
    textId: 'confirmation.cta',
    category: 'ui',
    translations: {
      fr: { text: "Retour au site YoJob", status: 'validated' },
      en: { text: "Back to YoJob website", status: 'auto-api' },
      de: { text: "Zurück zur YoJob-Website", status: 'auto-api' },
      es: { text: "Volver al sitio de YoJob", status: 'auto-api' },
      it: { text: "Torna al sito YoJob", status: 'auto-api' },
      pl: { text: "Powrót do strony YoJob", status: 'auto-api' },
      ro: { text: "Înapoi la site-ul YoJob", status: 'auto-api' },
      nl: { text: "Terug naar de YoJob-website", status: 'auto-api' },
      pt: { text: "Voltar ao site YoJob", status: 'auto-api' },
      cs: { text: "Zpět na web YoJob", status: 'auto-api' },
      hu: { text: "Vissza a YoJob weboldalra", status: 'auto-api' },
      sv: { text: "Tillbaka till YoJobs webbplats", status: 'auto-api' },
      bg: { text: "Обратно към сайта на YoJob", status: 'auto-api' },
      el: { text: "Επιστροφή στον ιστότοπο YoJob", status: 'auto-api' },
      sk: { text: "Späť na web YoJob", status: 'auto-api' },
      da: { text: "Tilbage til YoJobs hjemmeside", status: 'auto-api' },
      fi: { text: "Takaisin YoJobin verkkosivustolle", status: 'auto-api' },
      hr: { text: "Povratak na YoJob web stranicu", status: 'auto-api' },
      lt: { text: "Grįžti į YoJob svetainę", status: 'auto-api' },
      lv: { text: "Atpakaļ uz YoJob vietni", status: 'auto-api' },
      sl: { text: "Nazaj na spletno stran YoJob", status: 'auto-api' },
      et: { text: "Tagasi YoJobi veebilehele", status: 'auto-api' },
      no: { text: "Tilbake til YoJobs nettside", status: 'auto-api' }
    }
  },
  {
    textId: 'confirmation.thanks.title',
    category: 'ui',
    translations: {
      fr: { text: "🎁 En remerciement de votre participation :", status: 'validated' },
      en: { text: "🎁 As a thank you for your participation:", status: 'auto-api' },
      de: { text: "🎁 Als Dankeschön für Ihre Teilnahme:", status: 'auto-api' },
      es: { text: "🎁 Como agradecimiento por su participación:", status: 'auto-api' },
      it: { text: "🎁 Come ringraziamento per la tua partecipazione:", status: 'auto-api' },
      pl: { text: "🎁 W podziękowaniu za Twój udział:", status: 'auto-api' },
      ro: { text: "🎁 Ca mulțumire pentru participarea dvs.:", status: 'auto-api' },
      nl: { text: "🎁 Als dank voor uw deelname:", status: 'auto-api' },
      pt: { text: "🎁 Como agradecimento pela sua participação:", status: 'auto-api' },
      cs: { text: "🎁 Jako poděkování za vaši účast:", status: 'auto-api' },
      hu: { text: "🎁 Köszönetként a részvételért:", status: 'auto-api' },
      sv: { text: "🎁 Som ett tack för ditt deltagande:", status: 'auto-api' },
      bg: { text: "🎁 Като благодарност за участието ви:", status: 'auto-api' },
      el: { text: "🎁 Ως ευχαριστία για τη συμμετοχή σας:", status: 'auto-api' },
      sk: { text: "🎁 Ako poďakovanie za vašu účasť:", status: 'auto-api' },
      da: { text: "🎁 Som tak for din deltagelse:", status: 'auto-api' },
      fi: { text: "🎁 Kiitoksena osallistumisestasi:", status: 'auto-api' },
      hr: { text: "🎁 Kao zahvala za sudjelovanje:", status: 'auto-api' },
      lt: { text: "🎁 Kaip padėka už dalyvavimą:", status: 'auto-api' },
      lv: { text: "🎁 Kā pateicība par piedalīšanos:", status: 'auto-api' },
      sl: { text: "🎁 Kot zahvala za sodelovanje:", status: 'auto-api' },
      et: { text: "🎁 Tänuks osalemise eest:", status: 'auto-api' },
      no: { text: "🎁 Som takk for deltakelsen:", status: 'auto-api' }
    }
  },
  {
    textId: 'confirmation.thanks.item1',
    category: 'ui',
    translations: {
      fr: { text: '• Rapport exclusif "Tendances du détachement 2025"', status: 'validated' },
      en: { text: '• Exclusive report "Posting Trends 2025"', status: 'auto-api' },
      de: { text: '• Exklusiver Bericht "Entsendungstrends 2025"', status: 'auto-api' },
      es: { text: '• Informe exclusivo "Tendencias de desplazamiento 2025"', status: 'auto-api' },
      it: { text: '• Rapporto esclusivo "Tendenze di distacco 2025"', status: 'auto-api' },
      pl: { text: '• Ekskluzywny raport "Trendy delegowania 2025"', status: 'auto-api' },
      ro: { text: '• Raport exclusiv "Tendințe de detașare 2025"', status: 'auto-api' },
      nl: { text: '• Exclusief rapport "Detacheringstendensen 2025"', status: 'auto-api' },
      pt: { text: '• Relatório exclusivo "Tendências de destacamento 2025"', status: 'auto-api' },
      cs: { text: '• Exkluzivní zpráva "Trendy vysílání 2025"', status: 'auto-api' },
      hu: { text: '• Exkluzív jelentés "Kiküldetési trendek 2025"', status: 'auto-api' },
      sv: { text: '• Exklusiv rapport "Utstationeringstrander 2025"', status: 'auto-api' },
      bg: { text: "• Ексклузивен доклад \"Тенденции на командироване 2025\"", status: 'auto-api' },
      el: { text: '• Αποκλειστική αναφορά "Τάσεις απόσπασης 2025"', status: 'auto-api' },
      sk: { text: '• Exkluzívna správa "Trendy vysielania 2025"', status: 'auto-api' },
      da: { text: '• Eksklusiv rapport "Udstationeringstrends 2025"', status: 'auto-api' },
      fi: { text: '• Eksklusiivinen raportti "Lähettämistrendit 2025"', status: 'auto-api' },
      hr: { text: '• Ekskluzivno izvješće "Trendovi upućivanja 2025"', status: 'auto-api' },
      lt: { text: '• Ekskluzyvus pranešimas "Komandiravimo tendencijos 2025"', status: 'auto-api' },
      lv: { text: '• Ekskluzīvs ziņojums "Komandējumu tendences 2025"', status: 'auto-api' },
      sl: { text: '• Ekskluzivno poročilo "Trendi napotitve 2025"', status: 'auto-api' },
      et: { text: '• Eksklusiivne aruanne "Lähetamise trendid 2025"', status: 'auto-api' },
      no: { text: '• Eksklusiv rapport "Utstasjoneringstrender 2025"', status: 'auto-api' }
    }
  },
  {
    textId: 'confirmation.thanks.item2',
    category: 'ui',
    translations: {
      fr: { text: "• Top 100 répondants = 3 mois d'accès gratuit à YoJob (valeur 500€)", status: 'validated' },
      en: { text: "• Top 100 respondents = 3 months free access to YoJob (€500 value)", status: 'auto-api' },
      de: { text: "• Top 100 Teilnehmer = 3 Monate kostenloser Zugang zu YoJob (Wert 500€)", status: 'auto-api' },
      es: { text: "• Top 100 participantes = 3 meses de acceso gratuito a YoJob (valor 500€)", status: 'auto-api' },
      it: { text: "• Top 100 partecipanti = 3 mesi di accesso gratuito a YoJob (valore 500€)", status: 'auto-api' },
      pl: { text: "• Top 100 uczestników = 3 miesiące bezpłatnego dostępu do YoJob (wartość 500€)", status: 'auto-api' },
      ro: { text: "• Top 100 participanți = 3 luni acces gratuit la YoJob (valoare 500€)", status: 'auto-api' },
      nl: { text: "• Top 100 deelnemers = 3 maanden gratis toegang tot YoJob (waarde €500)", status: 'auto-api' },
      pt: { text: "• Top 100 participantes = 3 meses de acesso gratuito ao YoJob (valor 500€)", status: 'auto-api' },
      cs: { text: "• Top 100 účastníků = 3 měsíce bezplatného přístupu k YoJob (hodnota 500€)", status: 'auto-api' },
      hu: { text: "• Top 100 résztvevő = 3 hónap ingyenes hozzáférés a YoJobhoz (500€ értékben)", status: 'auto-api' },
      sv: { text: "• Topp 100 deltagare = 3 månaders gratis tillgång till YoJob (värde 500€)", status: 'auto-api' },
      bg: { text: "• Топ 100 участници = 3 месеца безплатен достъп до YoJob (стойност 500€)", status: 'auto-api' },
      el: { text: "• Κορυφαίοι 100 συμμετέχοντες = 3 μήνες δωρεάν πρόσβαση στο YoJob (αξία 500€)", status: 'auto-api' },
      sk: { text: "• Top 100 účastníkov = 3 mesiace bezplatného prístupu k YoJob (hodnota 500€)", status: 'auto-api' },
      da: { text: "• Top 100 deltagere = 3 måneders gratis adgang til YoJob (værdi 500€)", status: 'auto-api' },
      fi: { text: "• Top 100 osallistujaa = 3 kuukautta ilmaista pääsyä YoJobiin (arvo 500€)", status: 'auto-api' },
      hr: { text: "• Top 100 sudionika = 3 mjeseca besplatnog pristupa YoJobu (vrijednost 500€)", status: 'auto-api' },
      lt: { text: "• Top 100 dalyvių = 3 mėnesiai nemokamos prieigos prie YoJob (vertė 500€)", status: 'auto-api' },
      lv: { text: "• Top 100 dalībnieki = 3 mēneši bezmaksas piekļuve YoJob (vērtība 500€)", status: 'auto-api' },
      sl: { text: "• Top 100 udeležencev = 3 mesece brezplačnega dostopa do YoJob (vrednost 500€)", status: 'auto-api' },
      et: { text: "• Top 100 osalejat = 3 kuud tasuta juurdepääsu YoJobile (väärtus 500€)", status: 'auto-api' },
      no: { text: "• Topp 100 deltakere = 3 måneder gratis tilgang til YoJob (verdi €500)", status: 'auto-api' }
    }
  },
  
  // ========== BUTTON ==========
  {
    textId: 'button.submitting',
    category: 'ui',
    translations: {
      fr: { text: "Envoi en cours...", status: 'validated' },
      en: { text: "Submitting...", status: 'auto-api' },
      de: { text: "Wird gesendet...", status: 'auto-api' },
      es: { text: "Enviando...", status: 'auto-api' },
      it: { text: "Invio in corso...", status: 'auto-api' },
      pl: { text: "Wysyłanie...", status: 'auto-api' },
      ro: { text: "Se trimite...", status: 'auto-api' },
      nl: { text: "Verzenden...", status: 'auto-api' },
      pt: { text: "A enviar...", status: 'auto-api' },
      cs: { text: "Odesílání...", status: 'auto-api' },
      hu: { text: "Küldés folyamatban...", status: 'auto-api' },
      sv: { text: "Skickar...", status: 'auto-api' },
      bg: { text: "Изпращане...", status: 'auto-api' },
      el: { text: "Υποβολή...", status: 'auto-api' },
      sk: { text: "Odosielanie...", status: 'auto-api' },
      da: { text: "Indsender...", status: 'auto-api' },
      fi: { text: "Lähetetään...", status: 'auto-api' },
      hr: { text: "Slanje...", status: 'auto-api' },
      lt: { text: "Siunčiama...", status: 'auto-api' },
      lv: { text: "Nosūta...", status: 'auto-api' },
      sl: { text: "Pošiljanje...", status: 'auto-api' },
      et: { text: "Saatmine...", status: 'auto-api' },
      no: { text: "Sender...", status: 'auto-api' }
    }
  }
];

export async function seedCompleteTranslations(c: Context) {
  try {
    console.log('🌱 Starting to seed COMPLETE translations (FR + 22 languages)...');
    console.log(`📊 Total texts: ${COMPLETE_TRANSLATIONS.length}`);
    console.log(`🌍 Languages per text: 23 (fr + 22 others)`);
    console.log(`📈 Total translations to create: ${COMPLETE_TRANSLATIONS.length * 23} = ${18 * 23}`);
    
    const results = {
      textsCreated: 0,
      textsSkipped: 0,
      translationsAdded: 0,
      errors: 0,
      details: [] as any[]
    };

    for (const item of COMPLETE_TRANSLATIONS) {
      const key = `i18n:ui:${item.textId}`;
      
      try {
        // Check if already exists
        const existing = await kv.get(key);
        
        if (existing) {
          console.log(`🔄 Merging translations for: ${item.textId}`);
          
          // MERGE: Keep existing translations and ADD new ones
          const mergedTranslations = {
            ...existing.translations, // Keep existing
            ...item.translations      // Add new ones (will override if same language)
          };
          
          // Update with merged translations
          await kv.set(key, {
            textId: item.textId,
            key: item.textId,
            category: item.category,
            translations: mergedTranslations
          });
          
          const newLangsAdded = Object.keys(item.translations).length;
          const existingLangsCount = Object.keys(existing.translations || {}).length;
          const totalLangsNow = Object.keys(mergedTranslations).length;
          
          console.log(`✅ Merged: ${item.textId} (${existingLangsCount} → ${totalLangsNow} languages, +${totalLangsNow - existingLangsCount} new)`);
          results.textsSkipped++; // It existed, but we updated it
          results.translationsAdded += (totalLangsNow - existingLangsCount);
          results.details.push({
            textId: item.textId,
            status: 'merged',
            existingLanguages: existingLangsCount,
            newLanguages: totalLangsNow - existingLangsCount,
            totalLanguages: totalLangsNow
          });
          continue;
        }

        // Store the complete translation with all 23 languages (NEW text)
        await kv.set(key, {
          textId: item.textId,
          key: item.textId,
          category: item.category,
          translations: item.translations
        });

        const langCount = Object.keys(item.translations).length;
        console.log(`✅ Added: ${item.textId} (${langCount} languages)`);
        results.textsCreated++;
        results.translationsAdded += langCount;
        results.details.push({
          textId: item.textId,
          status: 'success',
          languages: langCount
        });

      } catch (error: any) {
        console.error(`❌ Error adding ${item.textId}:`, error.message);
        results.errors++;
        results.details.push({
          textId: item.textId,
          status: 'error',
          error: error.message
        });
      }
    }

    console.log('📊 Seeding Results:', {
      textsCreated: results.textsCreated,
      textsSkipped: results.textsSkipped,
      translationsAdded: results.translationsAdded,
      errors: results.errors,
      total: COMPLETE_TRANSLATIONS.length
    });

    return c.json({
      success: true,
      message: '🎉 Complete seeding done!',
      stats: {
        textsCreated: results.textsCreated,
        textsSkipped: results.textsSkipped,
        translationsAdded: results.translationsAdded,
        errors: results.errors,
        total: COMPLETE_TRANSLATIONS.length
      },
      details: results.details
    });

  } catch (error: any) {
    console.error('❌ Fatal error during complete seeding:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}