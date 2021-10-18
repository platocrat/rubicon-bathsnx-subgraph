import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Deposit as DepositSchema,
  LogInit as LogInitSchema,
  Withdrawal as WithdrawSchema,
  Transfer as TransferSchema,
  Approval as ApprovalSchema
} from "../../generated/schema"
import {
  LogInit,
  Deposit,
  Withdraw,
  Transfer,
  Approval
} from "../../generated/BathToken/BathToken"

export function handleLogInit(event: LogInit): void {
  let ep = event.params,
    // Set ID for this event as the BathWBTC address
    bathTokenAddress = ep._event.address.toHexString()

  let logInit = new LogInitSchema(bathTokenAddress)

  // Concatenate address and txn hash.
  logInit.id = bathTokenAddress + '-' + ep._event.transaction.hash.toHexString()
  logInit.timeOfInit = ep.timeOfInit

  logInit.save()
}

export function handleDeposit(event: Deposit): void {
  let ep = event.params,
    // Set ID for this event as the BathToken address
    depositID = ep._event.address.toHexString()

  let deposit = new DepositSchema(depositID)

  // Concatenate address and txn hash.
  deposit.id = depositID + '-' + ep._event.transaction.hash.toHexString()
  deposit.depositedAmt = ep.depositedAmt
  deposit.asset = ep.asset
  deposit.sharesReceived = ep.sharesReceived
  deposit.depositor = ep.depositor
  deposit.timestamp = ep._event.block.timestamp

  deposit.save()
}

export function handleWithdraw(event: Withdraw): void {
  let ep = event.params,
    // Set ID for this event as the BathToken address
    bathTokenAddress = ep._event.address.toHexString()

  let withdraw = new WithdrawSchema(bathTokenAddress)

  // Concatenate address and txn hash.
  withdraw.id = bathTokenAddress + '-' + ep._event.transaction.hash.toHexString()
  withdraw.asset = ep.asset
  withdraw.amountWithdrawn = ep.amountWithdrawn
  withdraw.sharesWithdrawn = ep.sharesWithdrawn
  withdraw.withdrawer = ep.withdrawer
  withdraw.fee = ep.fee
  withdraw.feeTo = ep.feeTo
  withdraw.timestamp = ep._event.block.timestamp

  withdraw.save()
}

export function handleTransfer(event: Transfer): void {
  let ep = event.params,
    // Set ID for this event as the BathToken address
    bathTokenAddress = ep._event.address.toHexString()

  let transfer = new TransferSchema(bathTokenAddress)

  // Concatenate address and txn hash.
  transfer.id = bathTokenAddress + '-' + ep._event.transaction.hash.toHexString()
  transfer.from = ep.from
  transfer.to = ep.to
  transfer.value = ep.value

  transfer.save()
}

export function handleApproval(event: Approval): void {
  let ep = event.params,
    // Set ID for this event as the BathToken address
    bathTokenAddress = ep._event.address.toHexString()

  let approval = new ApprovalSchema(bathTokenAddress)

  // Concatenate address and txn hash.
  approval.id = bathTokenAddress + '-' + ep._event.transaction.hash.toHexString()
  approval.owner = ep.owner
  approval.spender = ep.spender
  approval.value = ep.value

  approval.save()
}

