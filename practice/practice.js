function sell() {
    
    // 1. 厂家生产手机
    let factory = new Factory();
    let phone = factory.createPhone("");

    // 2. 厂家把手机给商家
    let bizMen = new BusinessMan();
    bizMen.fetchPhone(phone);
    // factory.transferPhoneToBizMen(phone, bizMen);

    // 3. 商家销售顾客
    bizMen.sellPhone();

}



class BusinessMan {

    sellPhone() {
        console.log("sell phone: " + this.phone);
    }

    fetchPhone(phone) {
        this.phone = phone;
    }

}




class Factory {


    // transferPhoneToBizMen(phone, bizMen) {
    //     // 1. 商家得到手机
    //     bizMen.fetchPhone(phone);
    // }


createPhone(originalInput) {
    // 1. CPU 内存条 机壳
    let cpu = originalInput.cpu;

    // 2. 组装
    let rawPhone = combine(cpu);

    // 3. 装箱
    wrap(rawPhone);

    return "phone";
}
}

