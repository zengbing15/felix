# felix

Felix is a telegram bot demo for interacting with CKB, hopefully with [luck](https://harrypotter.fandom.com/wiki/Felix_Felicis).We can use felix to send and grab CKB red envelopes.For now,felix is only used on the CKB Testnet, will be migrated to the CKB Mainnet for actual usage later. 

* For a sender, you need 
 * Set up a telegram bot 
 * Run a CKB Testnet node
 * Send and pay red envelopes
 * Use `ckb-cli`(recommended tool) to sign the messages required by the transaction
 * Use `generate-message-tool` to validate the messages by the transaction.
 
* For a grabber,you just need
 * Set a receiving CKB Testnet address.
 * Grad the red envelopes.

As grabbers’ operation is very simple, we will introduce the user guide in detail for senders below.


##User Guide for Senders

###Set up a telegram bot
 * [Create a telegram bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot) 
 * Send BotFather a list of commands
 
```bash
start - start
help - help
set_receiving_address - Set receiving address
receiving_address - Get receiving address
pending_envelopes - List of pending envelopes sent by me
pay - Pay an envelope
send - send envelopes
``` 
 
 * Fill in the bot token.
 
 ```bash
 /lib/server.js
 
 const bot = botgram("botToken",{ agent: utils.createAgent() });
 ``` 

### Run a CKB Testnet node

Please refer the [tutorial](https://docs.nervos.org/docs/basics/guides/testnet) for more details. 


### Send and pay red envelopes

This step is done by interacting with felix except prepare a CKB Testnet address with enough tokens, you can use [Nervos Aggron Faucet](https://faucet.nervos.org/) to claim CKB Testnet tokens.


### Use [`ckb-cli`](https://github.com/nervosnetwork/ckb-cli)(recommended tool) to sign the messages

Felix will provide messages required by the transaction for signing.It's recommended to use [`ckb-cli`](https://github.com/nervosnetwork/ckb-cli) 

```bash
$ ckb-cli

$ util sign-message --recoverable --from-account `the args of the address used to pay for the red envelope` --message `the message required by the transaction`
```

After signing the messages you will get the signatures, please send it to felix then the whole transaction will be generated and committed to CKB Testnet,the red envelope is successfully paid!

### Use `generate-message-tool` to validate the messages

 For securely signing CKB transactions we provide a tool to generate message from the whole transaction,so you can compare it with the message generated from felix.Please refer [github repo](https://github.com/zengbing15/generate-message-tool) for more details.
