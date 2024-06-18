document.addEventListener('alpine:init', () => {
    Alpine.data('manga', () => ({
        items:[
            {id:1, name:'lorem2', img:'manga1.jpg', price: 90000},
            {id:2, name:'lorem2', img:'manga2.jpg', price: 90000},
            {id:3, name:'lorem2', img:'manga3.jpg', price: 90000},
            {id:4, name:'lorem2', img:'manga4.jpg', price: 90000},
            {id:5, name:'lorem2', img:'manga5.jpg', price: 90000},
            {id:6, name:'lorem2', img:'manga6.jpg', price: 90000},
            {id:7, name:'lorem2', img:'manga7.jpg', price: 90000},
            {id:8, name:'lorem2', img:'manga8.jpg', price: 90000},
        ],
    }));

    Alpine.store('cart', {
        items:[],
        total: 0,
        quantity: 0,
        
        add(newItem) {
            const mangaItem=this.items.find((item)=> item.id === newItem.id);
            if(!mangaItem){
                this.items.push({...newItem, quantity:1,total:newItem.price});
                this.quantity++;
                this.total+=newItem.price;
            }else{
                this.items=this.items.map((item)=>{
                   if(item.id !==newItem.id){
                    return item;
                   } 
                   else{
                    item.quantity++;
                    item.total=item.price*item.quantity;
                    this.quantity++;
                    this.total+=item.price;
                    return item;
                   }
                })
            }
            console.log(newItem);
        },
        remove(id){
            const cartItem=this.items.find((item)=>item.id === id);
            if(cartItem.quantity>1){
                this.items=this.items.map((item)=>{
                    if(item.id !== id){
                        return item;
                    } else {
                        item.quantity--;
                        item.total=item.price*item.quantity;
                        this.quantity--;
                        this.total-=item.price;
                        return item;
                    } 
                })
            }else if(cartItem.quantity === 1){
                this.items=this.items.filter((item) =>item.id !== id);
                this.quantity--;
                this.total-=cartItem.price;
            }
        }
    });
});

const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style : 'currency',
        currency : 'IDR',
        minimumFractionDigits:0,
    }).format(number);
};
 