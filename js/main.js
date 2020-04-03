
/*
$.getJSON("sample.json", function(json) {
   //console.log(json); // this will show the info it in firebug console
   alert(json);
});
*/


//const defaultBoards = require('default.json');

/*
function readJSON(){
  var f = "default.json";
  //var retJson;
  var defaultBoards;
 
  var obj = new XMLHttpRequest();
 
  obj.open( 'get', f, false ); //ファイルオープン : 同期モード
  obj.onload = function() {
    try {
      defaultBoards = JSON.parse(this.responseText); //JSON型でパース。
    } catch (e) {
      alert("コマンド定義ファイルの読み込み、解析に失敗しました。");
    }
  }
  obj.send(null); //ここで読込実行。
  alert(defaultBoards);
  return defaultBoards;
}
readJSON()
*/

/*
let db;
let version = 1;
const request = indexedDB.open("database", version);
request.onerror = function(event) {
  alert("IndexedDB が使えません");
};
request.onupgradeneeded = function(event) {
  db = event.target.result;
  const objectStore = db.createObjectStore("items", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("description", "description", { unique: true });
};
request.onsuccess = function(event) {
  db = event.target.result;
  //alert("使えそうです。");
}
*/

const defaultBoards = [
    {
        "id": "sample-board-1",
        "title": "次の番号",
        "class": "task",
        "item": [
            {
                "title": "5"
            },
            {
                "title": "4"
            }
        ]
    },
    {
        "id": "sample-board-2",
        "title": "待機中",
        "class": "progress",
        "item": [
            {
                "title": "3"
            }
        ]
    },
    {
        "id": "sample-board-3",
        "title": "診察中",
        "class": "done",
        "item": [
            {
                "title": "2"
            }
        ]
    },
    {
        "id": "sample-board-4",
        "title": "完了",
        "class": "done",
        "item": [
            {
                "title": "1"
            }
        ]
    }
];


//jKanbanのインスタンス作成
const kanban = new jKanban({
    element: '#myKanban',  //タスク管理ボードを表示するHTML要素
    gutter: '15px',       //ボード同士の間隔
    widthBoard: '250px',      //ボードのサイズ
    boards: defaultBoards,//初期状態のJSONデータ
    addItemButton: true,         //タスク追加用のボタンを表示

    //click: (elem) => kanban.removeElement(elem),  //タスクをクリックして削除

    buttonClick: (elem, id) => addFormElement(id), //タスク追加用の関数を指定
    dropEl: function (el) {
        var total_array = [
            {
                "id": "sample-board-1",
                "title": "次の番号",
                "class": "task",
                "item": []
            },
            {
                "id": "sample-board-2",
                "title": "待機中",
                "class": "progress",
                "item": []
            },
            {
                "id": "sample-board-3",
                "title": "診察中",
                "class": "done",
                "item": []
            },
            {
                "id": "sample-board-4",
                "title": "完了",
                "class": "done",
                "item": []
            }
        ];
        //console.log("Trigger on all items click!");
        //alert("Trigger on all items click!" );
        var boardcontent = kanban.getBoardElements("sample-board-1");
        //alert(boardcontent);
        //.item(0).innerHTML
        var array1 = [];
        for (var i = 0; i < boardcontent.length; i++) {
            /*要素ノードの参照オブジェクト*/
            var elmNode = boardcontent.item(i);
            /*以下、要素ノードごとの処理*/

            array1.push("'title':" + elmNode.innerHTML);
            //alert(elmNode.innerHTML);
        }
        //alert(array1);
        var boardcontent2 = kanban.getBoardElements("sample-board-2");
        //alert(boardcontent);
        //.item(0).innerHTML
        var array2 = [];
        for (var i = 0; i < boardcontent2.length; i++) {
            /*要素ノードの参照オブジェクト*/
            var elmNode2 = boardcontent2.item(i);
            /*以下、要素ノードごとの処理*/

            array2.push("'title':" + elmNode2.innerHTML);
            //alert(elmNode.innerHTML);
        }
        //alert(array2);

        var boardcontent3 = kanban.getBoardElements("sample-board-3");
        //alert(boardcontent);
        //.item(0).innerHTML
        var array3 = [];
        for (var i = 0; i < boardcontent3.length; i++) {
            /*要素ノードの参照オブジェクト*/
            var elmNode3 = boardcontent3.item(i);
            /*以下、要素ノードごとの処理*/

            array3.push("'title':" + elmNode3.innerHTML);
            //alert(elmNode.innerHTML);
        }
        //alert(array3);

        var boardcontent4 = kanban.getBoardElements("sample-board-4");
        //alert(boardcontent);
        //.item(0).innerHTML
        var array4 = [];
        for (var i = 0; i < boardcontent4.length; i++) {
            /*要素ノードの参照オブジェクト*/
            var elmNode4 = boardcontent4.item(i);
            /*以下、要素ノードごとの処理*/

            array4.push("'title':" + elmNode4.innerHTML);
            //alert(elmNode.innerHTML);
        }
        //alert(array4);

        total_array[0]['item'] = array1;
        total_array[1]['item'] = array2;
        total_array[2]['item'] = array3;
        total_array[3]['item'] = array4;
        //alert(total_array);
        /*
        const fileName = "mochi.json";
        const data = JSON.stringify(total_array);
        const link = document.createElement("a");
        link.href = "data:text/plain," + encodeURIComponent(data);
        a.download = fileName;
        a.click();
        */

        var fsExtra = require('fs-extra');
        fsExtra.writeJson('result.json', total_array, {
            encoding: 'utf-8',
            replacer: null,
            spaces: null
        }, function (err) {
        });

    },
});



//タスク追加用の関数
function addFormElement(id) {
    const formItem = document.createElement('form');

    formItem.innerHTML = '<input type="number">';  //タスクを追加するための入力ボックスを作成
    kanban.addForm(id, formItem);  //入力ボックスをボードに追加

    //タスクを登録する時のイベント処理
    formItem.addEventListener('submit', (e) => {
        e.preventDefault();

        kanban.addElement(id, { "title": e.target[0].value }); //入力された文字列をタスクとして登録
        formItem.parentNode.removeChild(formItem); //入力ボックスを非表示にするために削除
    })
}

// requireの設定
const mysql = require('mysql');

// MySQLとのコネクションの作成
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: ' hospital_number'
});

// 接続
connection.connect();
alert('接続しました ');

// userdataの取得
connection.query('SELECT * from user;', function (err, rows, fields) {
    if (err) { console.log('err: ' + err); }

    alert('name: ' + rows[0].name);
    alert('id: ' + rows[0].id);

});

// userdataのカラムを取得
connection.query('SHOW COLUMNS FROM user;', function (err, rows, fields) {
    if (err) { console.log('err: ' + err); }

    alert(rows[0].Field);
    alert(rows[1].Field);
});

// 接続終了
connection.end();