# TEN Community Airdrop

## Overview[​](#overview "Direct link to Overview")

The TEN Community Airdrop rewards early participants who helped shape the network through testing, contributing, community engagement, and participation in Cookie Seasons. A total of **49,340 addresses** qualified across all chapters, with **6.150% of the total TEN supply** allocated to the airdrop.

TEN Token Contract Address: [0xEa9Bb54fC76BfD5DD2FF2f6dA641E78C230bB683](https://etherscan.io/address/0xEa9Bb54fC76BfD5DD2FF2f6dA641E78C230bB683)

Airdrop Claims Website: <http://airdrop.ten.xyz/>

Ethereum L1 Claims Period

Airdrop at a glance

* **49,340 eligible addresses**
* **6.150% of total supply** allocated to the community
* **50% unlock at TGE**
* **50% unlock after 6 months**
* Vesting starts at **TGE for all recipients**, regardless of claim chain or date

***

### Claims Period — Ethereum Mainnet[​](#claims-period--ethereum-mainnet "Direct link to Claims Period — Ethereum Mainnet")

The **Ethereum L1 Claims Period** opened on **27 November at 13:26 UTC** and will close on **2 December at 12:00 UTC**.

Within this window, eligible participants must **either claim their tokens on Ethereum** or **actively choose to defer** their claim to the TEN Mainnet.<br /><!-- -->If no action is taken before the deadline, the allocation will be **automatically deferred** to the TEN Mainnet launch.

### Deferred Claims — TEN Mainnet[​](#deferred-claims--ten-mainnet "Direct link to Deferred Claims — TEN Mainnet")

Participants marked as deferred will be able to claim their tokens on **TEN Mainnet**, where the claims window will remain open for **a minimum of two weeks** following the launch.

## Eligibility Groups[​](#eligibility-groups "Direct link to Eligibility Groups")

The following groups are included in the TEN Community Airdrop:

1. **Chapter One** – Early Testers & Early Contributors<br /><!-- -->Full details: [Chapter One – Community Rewards Story](https://blogs.ten.xyz/ten-airdrop-chapter-one-of-our-community-rewards-story/)

2. **Final Chapter** – Testers, Contributors, Cookie Season 1 Snappers<br /><!-- -->Full details: [Final Chapter – Airdrop](https://blogs.ten.xyz/airdrop-final-chapter/)

3. **Cookie Season 3 Snappers and Cookie MAF Stakers**

Across all of these groups, the total allocation for the Community Airdrop is **6.150% of the TEN token supply**.

***

## Vesting Policy[​](#vesting-policy "Direct link to Vesting Policy")

Vesting start point

All vesting schedules **start at the TGE date**, regardless of:

* when you claim; or
* whether you claim on Ethereum Mainnet or TEN Mainnet.

### Standard Vesting (most recipients)[​](#standard-vesting-most-recipients "Direct link to Standard Vesting (most recipients)")

For all eligible recipients **with less than 12,000 tokens available at TGE**:

* **50%** of the allocated tokens unlock at **Token Generation Event (TGE)**.
* The **remaining 50%** are locked for **6 months**, with a **single, one-time unlock** after the 6-month period.
* The second unlock happens **not earlier than 27 May 2025**.

Even if you choose to claim later on **TEN Mainnet** (launch date shown at [roadmap.ten.xyz](https://roadmap.ten.xyz/)), your vesting still counts from TGE. When you claim, you will be able to receive all tokens that have already vested by that time.

***

### Large Allocation Vesting (≥12,000 tokens at TGE)[​](#large-allocation-vesting-12000-tokens-at-tge "Direct link to Large Allocation Vesting (≥12,000 tokens at TGE)")

Recipients with **12,000 or more tokens available at TGE** are considered **Large Allocation Participants** and are subject to a smoother, linear vesting schedule to promote fair distribution:

* The TGE portion (first 50%) **does not unlock all at once**.
* Instead, it unlocks **in weekly tranches of 12,000 tokens** until this portion is fully unlocked.
* After the 6-month lock, the remaining 50% is also unlocked using the **same weekly 12,000-token tranche mechanism**, if that remaining balance is greater than 12,000 tokens.

All linear vesting for Large Allocation Participants also **starts counting from TGE**, even if the actual claim happens later or on a different chain. When you eventually claim (on Ethereum or TEN Mainnet), you will be able to claim all tokens that should have unlocked by that date according to the vesting schedule.

Key idea

The **timeline of unlocks is chain-agnostic**.<br /><!-- -->Whether you claim on Ethereum at TGE or later on TEN Mainnet, the amount you can claim at any moment is determined by the **same vesting schedule** that always starts at TGE.

***

## Linear Vesting: Examples[​](#linear-vesting-examples "Direct link to Linear Vesting: Examples")

* Standard participant
* Large allocation participant

**Scenario:** A participant receives **4,000 TEN** in total.

* At TGE:
  <!-- -->
  * 50% unlocks → 2,000 TEN become claimable.
* After 6 months (not earlier than 27 May 2025):
  <!-- -->
  * The remaining 2,000 TEN unlock in a **single, one-time event**.

There is **no weekly tranche logic** here because the TGE-available amount (2,000 TEN) is below 12,000 TEN.

If this user waits and claims only once on TEN Mainnet after its launch, they will see:

* At any time between TGE and 6 months: up to 2,000 TEN claimable (minus anything already claimed).
* After the 6-month cliff: the full 4,000 TEN claimable (minus anything already claimed).

**Scenario:** A participant receives **60,000 TEN** in total.

**1. First 50% at TGE**

* TGE portion: 60,000 × 0.5 = 30,000 TEN
* Because 30,000 ≥ 12,000, the linear vesting applies.

Weekly unlock amount: 12,000 TEN<br /><!-- -->Weeks required: 30,000 ÷ 12,000 = 3 weeks

* Week 1 after TGE: 12,000 TEN become claimable
* Week 2 after TGE: 12,000 TEN become claimable
* Week 3 after TGE: 6,000 TEN become claimable

**2. Second 50% after 6 months**

* Second portion: 60,000 × 0.5 = 30,000 TEN

* After the 6-month cliff, the same weekly schedule applies:

  <!-- -->

  * Week 1 after the cliff: 12,000 TEN
  * Week 2 after the cliff: 12,000 TEN
  * Week 3 after the cliff: 6,000 TEN

If this participant waits and claims on TEN Mainnet, for example 10 weeks after TGE, they will be able to claim all tokens that should have unlocked by that date, including both the TGE-portion tranches and (after the 6-month cliff) the second-portion tranches.

### Simple Vesting Notation[​](#simple-vesting-notation "Direct link to Simple Vesting Notation")

You can think of the large-allocation vesting logic like this (per phase: TGE portion or post-6-month portion):

* `total_allocation` — total tokens allocated to the user
* `phase_allocation` — total tokens in this phase (usually 50% of `total_allocation`)
* `weekly_unlock` — 12,000 TEN
* `weeks_needed` — `phase_allocation / weekly_unlock`

Unlocked amount after `t` weeks in a phase:

* `unlocked(t) = min(phase_allocation, t × weekly_unlock)`

Claimable amount at any time:

* `claimable = unlocked(t) − already_claimed`

`t` counts from **TGE** for the first 50%, and from **TGE + 6 months** for the second 50%.

***

## Ethereum Claim Fee (Custom Per-Token Fee)[​](#ethereum-claim-fee-custom-per-token-fee "Direct link to Ethereum Claim Fee (Custom Per-Token Fee)")

When claiming on **Ethereum Mainnet**, a **custom per-token fee** is applied in addition to regular gas fees:

* **Fee rate:** 0.002 USD denominated in ETH per claimable token (set as of TGE)

This fee is charged based on the number of tokens you are claiming at that moment.

**Example**

If a participant claims 10,000 TEN on Ethereum:

* Custom fee = 10,000 × 0.002 USD = **20 USD** in ETH

warning

This **0.002 USD per-token fee applies only to Ethereum Mainnet claims**.<br /><!-- -->TEN Mainnet claims **do not incur this fee**.

***

## Claim Options[​](#claim-options "Direct link to Claim Options")

Participants can choose between **Ethereum Mainnet** and **TEN Mainnet** when claiming their airdrop.

### Claiming on TEN Mainnet[​](#claiming-on-ten-mainnet "Direct link to Claiming on TEN Mainnet")

* **No 0.002 USD per-token fee**
* Lower operational cost for claiming
* Same vesting schedule (starting at TGE)
* Designed as the default path into the broader TEN ecosystem and may be eligible for **future ecosystem incentives**

### Claiming on Ethereum Mainnet[​](#claiming-on-ethereum-mainnet "Direct link to Claiming on Ethereum Mainnet")

* Subject to the **0.002 USD per-token custom fee**
* Also subject to Ethereum gas costs
* May not included bonuses and additional tokens associated with deferred claim

Practical takeaway

From an economic and ecosystem perspective, **TEN Mainnet is the recommended claim path**:

* No per-token deduction from your allocation
* Lower overall claim cost
* Natural entry point into the TEN ecosystem and its future incentives

Ethereum Mainnet claiming remains possible, but is **generally less attractive** due to the additional 0.002 USD per-token fee and higher network costs.

***

The TEN Community Airdrop combines recognition of early participants with a vesting design that protects the protocol from short-term pressure, while giving users flexibility in when and where they claim.
