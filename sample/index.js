
<!-- jQuery 3.1.0 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
 
<!-- jQuery UI 1.12.1 -->
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
 
<script type="text/javascript">
function put_result(ui){
    $("#result_box").html("現在の要素のIDの順番は下記のとおりです。<br />");
    
    $("#box").find(".card").each(function(index, element){
        var id = $(this).attr("id");
        $("#result_box").append(id+"<br />");
    });
 
    if(ui){ // もしドラッグ後であれば
        // ドラッグされた要素のIDを取得
        var dragged_id = ui.item[0].id;
        $("#result_box").append("ドラッグされた要素のIDは"+dragged_id+"です<br />");
    }
}
$(function(){
    put_result();
    $("#box").sortable({
        axis: "y", // ドラッグの方向を縦に固定
        "opacity": 0.5, // ドラッグ中の透明度
        "update": function(event,ui){ // ドラッグ完了後のコールバック
            put_result(ui);
        }
    });
 
});
</script>