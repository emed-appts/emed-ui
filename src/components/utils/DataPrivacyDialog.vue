<template>
  <v-dialog v-model="show" max-width="760">
    <v-btn class="btn--inline" slot="activator" flat :ripple="false">
      <slot></slot>
    </v-btn>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Datenschutzrichtlinien
      </v-card-title>
      <v-card-text>
        <p>
          <strong>1. Verarbeitung personenbezogener Daten</strong>
          <br />
          Unter personenbezogenen Daten verstehen wir Informationen zur
          Identität betroffener Personen, wie beispielsweise deren Namen,
          E-Mail-Adresse und Sozialversicherungsnummer. Betroffene Personen sind
          jene, deren personenbezogene Daten wir zum Zwecke der
          Terminreservierung verarbeiten.
        </p>
        <p>
          <strong>1.1 Fairness und Rechtmäßigkeit</strong>
          <br />
          Bei der Verarbeitung personenbezogener Daten werden wir die
          Persönlichkeitsrechte der Betroffenen wahren. Personenbezogene Daten
          werden wir stets auf rechtmäßige Weise, nach Treu und Glauben und in
          einer für die betroffenen Personen nachvollziehbaren Weise
          verarbeiten.
        </p>
        <p>
          <strong>1.2 Zweckbindung</strong>
          <br />
          Die Verarbeitung personenbezogener Daten darf lediglich jene Zwecke
          verfolgen, die vor der Erhebung der Daten festgelegt wurden.
          Nachträgliche Änderungen der Zwecke sind nur eingeschränkt möglich und
          bedürfen einer Rechtfertigung.
        </p>
        <p>
          <strong>1.3 Sachliche Richtigkeit</strong>
          <br />
          Personenbezogene Daten sind richtig, vollständig und auf dem aktuellen
          Stand zu speichern. Wir treffen daher passende Maßnahmen, um
          sicherzustellen, dass nichtzutreffende, unvollständige oder veraltete
          Daten gelöscht, berichtigt, ergänzt oder aktualisiert werden.
        </p>
        <p>
          <strong>1.4 Transparenz</strong>
          <br />
          Personenbezogene Daten erheben wir bei den betroffenen Personen
          selbst.
        </p>
        <p>
          <strong>1.5 Datenvermeidung und Datensparsamkeit</strong>
          <br />
          Wir erheben personenbezogene Daten nur in dem Umfang, der für den
          angestrebten Zweck notwendig ist.
        </p>
        <p>
          <strong>1.6 Löschung von Daten</strong>
          <br />
          Personenbezogene Daten, die nach Ablauf von gesetzlichen oder
          geschäftsprozessbezogenen Aufbewahrungsfristen nicht mehr erforderlich
          sind, werden wir löschen. Bestehen im Einzelfall Anhaltspunkte für
          schutzwürdige Interessen oder für eine historische Bedeutung dieser
          Daten, müssen wir die Daten weiter speichern, bis das schutzwürdige
          Interesse rechtlich geklärt wurde.
        </p>
        <p>
          <strong>1.7 Vertraulichkeit und Datensicherheit</strong>
          <br />
          Für personenbezogene Daten gilt das Datengeheimnis. Sie werden im
          persönlichen Umgang vertraulich behandelt. Im Rahmen unserer
          Möglichkeiten treffen wir angemessene organisatorische und technische
          Maßnahmen gegen unberechtigten Zugriff, unrechtmäßige Verarbeitung
          oder Weitergabe, sowie versehentlichen Verlust, Veränderung oder
          Zerstörung.
        </p>
        <p>
          <strong>2. Rechtmäßigkeit der Datenverarbeitung</strong>
          <br />
          Die Erhebung, Verarbeitung und Nutzung personenbezogene Daten ist nur
          rechtmäßig, wenn eine der nachfolgenden Bedingungen vorliegt. Ändert
          sich der Zweck gegenüber der ursprünglichen Bestimmung, ist dafür
          erneut eine Rechtsgrundlage nachzuweisen.
        </p>
        <p>
          <strong>2.1 Datenverarbeitung für eine vertragliche Beziehung</strong>
          <br />
          Personenbezogene Daten von Patienten dürfen zur Begründung und zur
          Durchführung eines Vertrages verarbeitet werden. Dies umfasst auch die
          Betreuung der Vertragspartner, sofern dies im Zusammenhang mit dem
          Vertragszweck steht.
          <br />
          Patienten dürfen unter Verwendung der Daten kontaktiert werden, die
          sie mitgeteilt haben.
        </p>
        <p>
          <strong>
            2.2 Datenverarbeitung aufgrund berechtigten Interesses
          </strong>
          <br />
          Die Verarbeitung personenbezogener Daten kann auch erfolgen, wenn dies
          zur Verwirklichung eines berechtigten Interesses unseres Unternehmens
          erforderlich ist. Berechtigte Interessen sind in der Regel rechtliche,
          wie zur Durchsetzung von offenen Forderungen oder wirtschaftliche, wie
          zur Vermeidung von Vertragsstörungen.
          <br />
          Eine Verarbeitung personenbezogene Daten aufgrund eines berechtigten
          Interesses darf nicht erfolgen, wenn es im Einzelfall einen
          Anhaltspunkt dafür gibt, dass schutzwürdige Interessen des Betroffenen
          das Interesse an der Verarbeitung überwiegen. Die schutzwürdigen
          Interessen sind für jede Verarbeitung zu prüfen.
        </p>
        <p>
          <strong>3. Übermittlung personenbezogene Daten</strong>
          <br />
          Eine Übermittlung von personenbezogenen Daten an Empfänger außerhalb
          des Unternehmens findet unter Beachtung der Datenschutzgesetze statt.
          Der Empfänger der Daten wird darauf verpflichtet, diese nur zu den
          festgelegten Zwecken zu verwenden.
        </p>
        <p class="mb-1">
          <strong>4. Rechte der betroffenen Person</strong>
          <br />
          Jede betroffene Person kann nachfolgende Rechte wahrnehmen. Ihre
          Geltendmachung ist unverzüglich durch den Verantwortlichen zu
          bearbeiten und spätestens innerhalb von 4 Wochen zu beantworten. Für
          die betroffene Person darf die Ausübung der Rechte zu keinerlei
          Nachteilen führen.
        </p>
        <ol type="a" class="mb-3">
          <li>
            Die betroffene Person kann Auskunft darüber verlangen, welche
            personenbezogenen Daten welcher Herkunft über sie zu welchem Zweck
            gespeichert sind.
          </li>
          <li>
            Werden personenbezogene Daten an Dritte übermittelt, muss auch über
            die Identität des Empfängers oder über die Kategorien von Empfängern
            Auskunft gegeben werden.
          </li>
          <li>
            Sollten personenbezogene Daten unrichtig oder unvollständig sein,
            kann die betroffene Person ihre Berichtigung oder Ergänzung
            verlangen.
          </li>
          <li>
            Die betroffene Person kann der Verarbeitung ihrer personenbezogenen
            Daten widersprechen.
          </li>
          <li>
            Die betroffene Person ist berechtigt, die Löschung ihrer Daten zu
            verlangen, wenn die Rechtsgrundlage für die Verarbeitung der Daten
            fehlt oder weggefallen ist. Gleiches gilt für den Fall, dass der
            Zweck der Datenverarbeitung durch Zeitablauf oder aus anderen
            Gründen entfallen ist.
          </li>
          <li>
            Bestehende Aufbewahrungspflichten und einer Löschung
            entgegenstehende schutzwürdige Interessen, wie zur Geltendmachung,
            Ausübung oder Verteidigung von Rechtsansprüchen des Verantwortlichen
            oder Dritter, müssen beachtet werden.
          </li>
          <li>
            Die betroffene Person hat ein grundsätzliches Widerspruchsrecht
            gegen die Verarbeitung ihrer Daten, wenn ihr schutzwürdiges
            Interesse aufgrund einer besonderen persönlichen Situation das
            Interesse an der Verarbeitung überwiegt. Dies gilt nicht, wenn eine
            Rechtsvorschrift zur Durchführung der Verarbeitung verpflichtet.
          </li>
          <li>
            Die betroffene Person hat jederzeit ein Beschwerderecht bei der
            zuständigen Datenschutzbehörde.
          </li>
        </ol>
        <p>
          <strong>5. Cookies</strong>
          <br />
          Wir sammeln grundsätzlich keinerlei personenbezogenen Daten während
          Ihres Besuches unserer Homepage.
          <br />
          Internetseiten verwenden teilweise so genannte Cookies. Cookies
          richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren.
          Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und
          sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem
          Rechner abgelegt werden und die Ihr Browser speichert. Die von uns
          verwendeten Cookies sind so genannte Session-Cookies. Sie werden nach
          Ende Ihres Besuchs automatisch gelöscht.
          <br />
          Sie können Ihren Browser so einstellen, dass Sie über das Setzen von
          Cookies informiert werden und Cookies nur im Einzelfall erlauben, die
          Annahme von Cookies für bestimmte Fälle oder generell ausschließen
          sowie das automatische Löschen der Cookies beim Schließen des Browsers
          aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität
          dieser Website eingeschränkt sein.
        </p>
        <p class="mb-1">
          <strong>6. Zugriffsdaten</strong>
          <br />
          Ihr Besuch unserer Webseite wird protokolliert. Erhoben werden Daten
          über Zugriffe auf die Seite und speichert diese als Server-Logfiles
          ab. Folgende Daten werden so protokolliert:
        </p>
        <ul class="mb-1">
          <li>Besuchte Website</li>
          <li>Uhrzeit zum Zeitpunkt des Zugriffes</li>
          <li>Verwendeter Browser</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Verwendete IP-Adresse</li>
        </ul>
        <p>
          Die erhobenen Daten dienen lediglich statistischen Auswertungen und
          zur Verbesserung der Website. Wir behalten uns allerdings vor, die
          Server-Logfiles nachträglich zu überprüfen, sollten konkrete
          Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.
        </p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="show = false">
          Fertig
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    show: false
  })
};
</script>

<style lang="stylus" scoped>
.btn--inline
  padding: 0 .2em
  margin: 0
  height: auto
  vertical-align: initial
  text-decoration: underline
  text-transform: initial
</style>
