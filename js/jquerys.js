/*Footer*/
$("#fBlockOne").hover(function () {
    // over
    $("#fBlockOne .footer-block-bg").css({
      height: "100%",
      transition: "all .4s ease",
    });
  }, function () {
    // out
    $("#fBlockOne .footer-block-bg").css({
      height: "0",
      transition: "all .4s ease",
    });
  }
);

$("#fBlockTwo").hover(function () {
    // over
    $("#fBlockTwo .footer-block-bg").css({
      height: "100%",
      transition: "all .4s ease",
    });
  }, function () {
    // out
    $("#fBlockTwo .footer-block-bg").css({
      height: "0",
      transition: "all .4s ease",
    });
  }
);

$("#fBlockThree").hover(function () {
    // over
    $("#fBlockThree .footer-block-bg").css({
      height: "100%",
      transition: "all .4s ease",
    });
  }, function () {
    // out
    $("#fBlockThree .footer-block-bg").css({
      height: "0",
      transition: "all .4s ease",
    });
  }
);


$("#fBlockOne a").hover(function () {
    // over
    $("#fBlockOne .s-f-block-title").css('color', 'var(--green-system)')
  }, function () {
    // out
    $("#fBlockOne .s-f-block-title").css('color', 'var(--white)')
  }
);

$("#fBlockTwo a").hover(function () {
    // over
    $("#fBlockTwo .s-f-block-title").css('color', 'var(--green-system)')
  }, function () {
    // out
    $("#fBlockTwo .s-f-block-title").css('color', 'var(--white)')
  }
);

$("#fBlockThree a").hover(function () {
    // over
    $("#fBlockThree .s-f-block-title").css('color', 'var(--green-system)')
  }, function () {
    // out
    $("#fBlockThree .s-f-block-title").css('color', 'var(--white)')
  }
);
