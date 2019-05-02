<template>
  <div>
    <h2 class="headline mb-4">Information vor ihrem Arztbesuch</h2>
    <h3 class="mb-3">Notfallpatienten</h3>
    <p>
      <strong>
        Bei folgenden Symptomen sollten Sie (auch ohne Termin) die Ordination
        aufsuchen:
      </strong>
    </p>
    <p>
      Akute Entzündungen oder Verletzungen im Augenbereich, plötzliche Schmerzen
      (Augen- oder starke Kopfschmerzen), plötzliche Sehverschlechterung oder
      Auftreten von Sehstörungen wie dichte Schleier, Lichtblitze oder
      Doppeltsehen sollten für Sie ein Alarmzeichen sein. Suchen Sie so rasch
      wie möglich unsere Ordination - wenn möglich nach telefonischem Aviso -
      auf. Teilen Sie am Telefon die Dringlichkeit mit. Je plötzlicher die
      Symptome aufgetreten sind, umso kurzfristiger sollte eine Untersuchung
      erfolgen.
    </p>
    <p>
      <strong>
        Wichtiger Hinweis:
      </strong>
      versuchen Sie keine Therapie, bei Verletzungen verwenden Sie keinesfalls
      Tropfen oder Salben, sondern legen Sie allenfalls einen sterilen Verband
      an.
    </p>
    <p>
      Sollten Sie weder uns noch unsere Vertretung erreichen können, wenden Sie
      sich an:
    </p>
    <p>
      <strong>
        Augenambulanz AKH Ried/Innkreis (07752/602-0)<br />
        Augenambulanz des Klinikums Kreuzschwestern Wels (07242/415-0).
      </strong>
    </p>
    <p>
      Auch plötzlicher Bruch oder Verlust einer Brille kann für den Betroffenen
      einen Notfall darstellen. Sie sollten daher bereits vorsorglich eine
      Reservebrille besitzen. Rufen Sie in diesem Falle bitte an, wir werden uns
      um Ihr Problem kümmern.
    </p>
    <v-btn class="ml-0 mt-2" color="primary" @click="goNextStep">Weiter</v-btn>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { GO_NEXT_STEP } from "../plugins/vuex/mutation-types";

export default {
  methods: mapMutations({
    goNextStep: GO_NEXT_STEP
  })
};
</script>
