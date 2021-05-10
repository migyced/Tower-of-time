class Inventory
{
    constructor()
    {
        this.inventoryList = [];
    }

    addItem(item)
    {
        this.inventoryList[this.inventoryList.length] = item;
    }

    removeItem(item)
    {
        for (let index = 0; index < this.inventoryList.length; index++) 
        {
           if(this.inventoryList[index] == item)
           {
               this.inventoryList.splice(index);
           }
        }
    }

    checkItem(item)
    {
        for (let index = 0; index < this.inventoryList.length; index++)
        {
            if(this.inventoryList[index] == item)
            {
                return true;
            }
        }
        return false;
    }

    Clear()
    {
        this.inventoryList = [];
    }
}