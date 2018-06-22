define(['jquery'], function() {
 var Menu = Class.extend({
     init: function(){
         this.inventoryOn = null;
     },
     clickInventory: function(i){
         if(this.inventoryOn === "inventory"+i){
             this.close();
         } else{
             this.inventoryOn = "inventory"+i;
         }
     },
     isClickedInventoryMenu: function(pos, camera){
      if(pos.x === camera.gridX + camera.gridW-2
         || pos.x === camera.gridX + camera.gridW-1){
        if(pos.y == camera.gridY + camera.gridH-2){
          return 1;
        } else if(pos.y == camera.gridY + camera.gridH-3){
          return 2;
        } else if(pos.y == camera.gridY + camera.gridH-4){
          return 3;
        } else{
          return 0;
        }
      } else{
        return 0;
      }
    },
     close: function(){
         this.inventoryOn = null;
     },
 });

 return Menu;
});