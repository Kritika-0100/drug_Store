import { wixData } from 'wix-data';

$w.onReady(function () {
  $w('#searchInput').onInput((event) => {
    let query = $w('#searchInput').value;
    wixData.query("MedSync")
      .contains("productName", query)
      .find()
      .then((results) => {
        $w('#repeater1').data = results.items;
      });
  });
});
