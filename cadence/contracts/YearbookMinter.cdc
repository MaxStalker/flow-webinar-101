// Put contracts around every line
pub contract YearbookMinter{

    pub event YearbookCreate(address: Address)
    pub event YearbookSigned(signer: Address, message: String) 

    pub resource Yearbook{
        pub let messages: {Address: String}

        pub fun leaveMessage(message: String, capability: &Yearbook){
            let owner = capability.owner!.address
            emit YearbookSigned(signer: owner, message: message)
            self.messages[owner] = message
        }

        init(){
            self.messages = {};
        }
    }

    pub fun createYearbook(owner: Address): @Yearbook{
        let book <- create Yearbook()
        emit YearbookCreate(address:  owner)
        return <- book
    }
}