import YearbookMinter from "../contracts/YearbookMinter.cdc"

transaction {
  prepare(signer: AuthAccount) {
    let yearbookExists = signer.getCapability(/public/Yearbook)
      .check<&YearbookMinter.Yearbook>()

    if(!yearbookExists){
      let book <- YearbookMinter.createYearbook(owner: signer.address)
      signer.save(<-book, to: /storage/Yearbook)
      signer.link<&YearbookMinter.Yearbook>(/public/Yearbook, target: /storage/Yearbook)
    }
  }
}
