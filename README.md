### Note
- I picked Frontend assessment.
- I wrote Backend code as well, just for full function showcase. So, I just do bare minimum validation on the backend, just for it to run.

### Setting things up:
1. Run below command
```bash
yarn && yarn dev
```
2. Open [localhost](http://localhost:3000)
3. Ensure that you have Metamask installed and setup with a wallet


### Design decisions and libraries
- NextJS as Frontend framework
- Also NextJS as API provider for PoC/showcasing project
- Ethersjs, BigDecimal, metamask/sdk, wagmi for web3
- Shadcn, tailwindcss for UI

### Testing
1. User able to reserve NFT (or their token)
2. User should be notify about reserve status (failed or successfully)
3. User can't use an invalid code
4. User should be able to connect their wallet
5. User should be able to disconnect their wallet

#### Test data
Please use below code
```json
  {
    "code": "MOCA-1234567890",
    "max_use": 10
  },
  {
    "code": "MOCA-A1B2C3D4E5",
    "max_use": 2
  }
```

#### For troubleshooting data, please refers:
```
./store/code.json // store all the valid code
./store/email.json // store all the email which reserved
./store/reserve.json // store the reservation with each code
```

### Things to do if I have more time
- Better SEO by apply SSR
- Mobile responsive
- Add support for other wallet provider, beside metamask
- Add nonce API for Backend and integrate it to each transaction to be more secure
- Backend API provided by document is not RESTful -> if really do this we need better API
- Validate signature which user submit with the nonce sent from Backend.
- Store data in database
- For high traffic and concurrency, our architecture should be horizontal scalable -> Will need to use distributed locking
- User reserved NFT should be validate by our Backend service first. Later on, when they want to withdrawn to their account, they will have to make the transaction and pay the gas fee themselves
- Invite code can be in format: <Event_name>-<XXXXXXXXXX(10 digits and alphabetical)>
