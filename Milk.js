class Milk{
    constructor(){
        this.foodStock;
        this.lastFed;
        this.image = loadImage('images/Milk1.png')
    }

    getFoodStock(){
        this.foodStock;
    }

    updateFoodStock(){
        this.foodStock = this.foodStock;
    }

    markFoodStock(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock-1;
        }
    }

    getFeedTime(feedTime){
        this.feedTime = feedTime;
    }

    display(){
        var x = 80, y = 100;
        imageMode(CENTER);
        image(this.image,600,220,70,70);

        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 == 0){
                    x = 80;
                    y = y + 50;
                }

                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }
}