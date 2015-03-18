'use strict';

var translateFrench = {
  EN_SELECTED: '',
  FR_SELECTED: 'active',
  DE_SELECTED: '',
  TITLE: 'Hello',
  FOO: 'This is a paragraph',
  BUTTON_LANG_DE: 'Deutsch',
  BUTTON_LANG_EN: 'English',
  BUTTON_LANG_FR: 'Français',
  HOME: {
    MENU_TITLE: 'Accueil',
    TITLE: 'Bienvenue chez ArimorC'
  },
  EXPERTISE: {
    MENU_TITLE: 'Notre Expertise',
    TITLE: 'Notre Expertise'
  },
  REFERENCES: {
    MENU_TITLE: 'Références',
    TITLE: 'Références'
  },
  ABOUT_US: {
    MENU_TITLE: 'A Propos',
    TITLE: 'A Propos d\'ArimorC'
  },
  CONTACT_US: {
    MENU_TITLE: 'Contacts',
    TITLE: 'Contactez-nous'
  },
  CAREERS: {
    MENU_TITLE: 'Nous recrutons!',
    TITLE: 'Nous recrutons!'
  },
  INTRANET: {
    MENU_TITLE: 'Intranet'
  },
  IMPRESSUM: {
    MENU_TITLE: 'Impressum',
    TITLE_1: 'Impressum',
    SUB_1: 'Angaben gemäss § 5 TMG:',
    PARAGRAPH_1_1: 'ARIMOR Consulting GmbH',
    PARAGRAPH_1_2: 'Graf-Recke-Strasse 211C',
    PARAGRAPH_1_3: '40237 Düsseldorf',
    SUB_2: 'Vertreten durch:',
    PARAGRAPH_2: 'Romaric Barthe',
    SUB_3: 'Kontakt:',
    PARAGRAPH_3_1: 'Telefon: +491741769093',
    PARAGRAPH_3_2:  'E-Mail: rbarthe@arimor-consulting.de',
    SUB_4: 'Registereintrag:',
    PARAGRAPH_4_1: 'Eintragung im Handelsregister.',
    PARAGRAPH_4_2:  'Registergericht: Düsseldorf',
    PARAGRAPH_4_3:  'Registernummer: 70989',
    SUB_5: 'Umsatzsteuer-ID:',
    PARAGRAPH_5_1: 'Umsatzsteuer-Identifikationsnummer gemäss §27 a Umsatzsteuergesetz:',
    PARAGRAPH_5_2:  'DE290997039',
    TITLE_2: 'Haftungsausschluss (Disclaimer)',
    SUB_6: 'Haftung für Inhalte',
    PARAGRAPH_6: 'Als Diensteanbieter sind wir gemäss § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    SUB_7: 'Haftung für Links',
    PARAGRAPH_7: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    SUB_8: 'Urheberrecht',
    PARAGRAPH_8: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.'
  }
};

angular.module('arimorcApp')
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('fr', translateFrench);
  }]);
