import { Transfer as TransferEvent } from "../generated/Foundation/Foundation";
import { Transfer, Account } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let transferEntity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  transferEntity.from = event.params.from.toHex();
  transferEntity.to = event.params.to.toHex();
  transferEntity.tokenId = event.params.tokenId;
  transferEntity.transactionHash = event.transaction.hash.toHex();
  transferEntity.timestamp = event.block.timestamp;
  transferEntity.save();

  let fromAccountEntity = Account.load(event.params.from.toHex());
  if (fromAccountEntity == null) {
    fromAccountEntity = new Account(event.params.from.toHex());
    fromAccountEntity.address = event.params.from.toHex();
    fromAccountEntity.createdAt = event.block.timestamp;
    fromAccountEntity.save();
  }

  let toAccountEntity = Account.load(event.params.to.toHex());
  if (toAccountEntity == null) {
    toAccountEntity = new Account(event.params.to.toHex());
    toAccountEntity.address = event.params.to.toHex();
    toAccountEntity.createdAt = event.block.timestamp;
    toAccountEntity.save();
  }
}
