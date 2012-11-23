$(function () {
    var Tile = Backbone.Model.extend({
        defaults: {
            filled:false,
            content:"",
            x:0,
            y:0
        },
        fill:function (content) {
            if (this.get("filled")===false) {
                this.set({filled: true, content:content});
            }
        },
        initialize:function () {
        }
    });
    
    var Board = Backbone.Collection.extend({
        model: Tile
    });
    
    var BoardView = Backbone.View.extend({
        el:'section.board',
        
        initialize: function () {
            this.board = new Board();
            var self = this;
            for (var y=1;y<=3;y++) {
                for (var x=1;x<=3;x++) {
                    var t = new Tile({
                        x:x,
                        y:y
                    });
                    t.on("change", function () {
                        self.updateTile(this);
                    });
                    this.board.add(t);
                }
            }
            
            this.render();
        },
        render:function () {
            var self = this;
            jQuery.each(this.board.models, function (index, tile) {
                self.renderTile(tile);
            });
            return this;
        },
        renderTile:function (tile) {
            var e = $('<div></div>').addClass('tile');
            if (tile.get('filled')===true)
                e.addClass('filled');
            
            e.html(tile.get("content"));
            e.attr({
                "data-x":tile.get("x"),
                "data-y":tile.get("y")
            });
            e.on("click", function (evt) {
                tile.fill("X");
            });
            $(this.el).append(e);
        },
        updateTile:function (tile) {
            var $tile = $('div.tile[data-x="'+tile.get("x")+'"][data-y="'+tile.get("y")+'"]');
            $tile.html(tile.get("content"));
            if (tile.get("filled"))
                $tile.addClass('filled');
        }
    });
    var AsideView = Backbone.View.extend({
        sidebar:'aside'
    });
    
    new (Backbone.View.extend({
        el:'body',
        initialize:function () {
            var boardView = new BoardView();
            var asideView = new AsideView();
        }
    }))();
});