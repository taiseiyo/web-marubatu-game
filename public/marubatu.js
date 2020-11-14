let id_list = ["id0", "id1", "id2", "id3", "id4", "id5", "id6", "id7", "id8"];

function do_if_loop(tmp, button2, table_id, flag) {
  if (flag == true) {
    ref1.child(table_id).update({symbol: "〇"});
    ref1.child("word").update({maru_batu_event: "次 → 後攻 ×"});
  } else {
    ref1.child(table_id).update({symbol: "×"});
    ref1.child("word").update({maru_batu_event: "次 → 先攻 〇"});
  }

  ref1.on("value", function (snapshot) {
    button2.innerHTML = snapshot.child("word").child("maru_batu_event").val();
  });

  for (let i = 0; i <= 8; i++) {
    let ids = document.getElementById("id" + i);
    ref1.on("value", function (snapshot) {
      ids.innerHTML = snapshot
        .child("id" + i)
        .child("symbol")
        .val();
    });
  }
}

function return_flag(ref1) {
  ref1.on("value", function (snapshot) {
    flag = snapshot.child("flag").child("t_f").val();
  });
  return flag;
}

function show_maru_batu(table_id) {
  let tmp = document.getElementById(table_id);
  let button2 = document.getElementById("teaching_order");

  if (id_list.includes(table_id) == true && return_flag(ref1) == true) {
    do_if_loop(tmp, button2, table_id, return_flag(ref1));
    id_list.splice(id_list.indexOf(table_id), 1);
    ref1.child("flag").update({t_f: false});
  } else if (id_list.includes(table_id) == true && return_flag(ref1) == false) {
    do_if_loop(tmp, button2, table_id, return_flag(ref1));
    ref1.child("flag").update({t_f: true});
    id_list.splice(id_list.indexOf(table_id), 1);
  }
}

function playing_first() {
  for (let i = 0; i <= 8; i++) {
    let ids = document.getElementById("id" + i);
    ref1.child("id" + i).update({symbol: "△"});
    ref1.on("value", function (snapshot) {
      ids.innerHTML = snapshot
        .child("id" + i)
        .child("symbol")
        .val();
    });
  }
  let button2 = document.getElementById("teaching_order");
  ref1.child("word").update({maru_batu_event: "次 → 先攻 〇"});
  ref1.child("flag").update({t_f: true});

  ref1.on("value", function (snapshot) {
    button2.innerHTML = snapshot.child("word").child("maru_batu_event").val();
  });
  id_list = ["id0", "id1", "id2", "id3", "id4", "id5", "id6", "id7", "id8"];
}
