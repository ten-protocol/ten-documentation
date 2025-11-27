---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# TEN Community Airdrop

## Overview

The TEN Community Airdrop is a core initiative designed to recognize and reward early adopters, contributors, and active participants who helped shape the TEN Network. It aligns with the Association’s mission by distributing part of the token supply to the community in a transparent and responsible way.

:::info Airdrop at a glance
- **49,340 eligible addresses** in total  
- **6.150% of total token supply** allocated across all chapters  
- **50% unlock at TGE, 50% unlock after 6 months**  
- Identical vesting schedule across **Ethereum Mainnet** and **TEN Mainnet**
:::

### Eligibility and Groups

In total, **49,340 addresses** are eligible for the TEN Community Airdrop. These addresses are distributed across several groups:

1. **Chapter One** — Early Testers and Early Contributors  
   Full eligibility details:  
   https://blogs.ten.xyz/ten-airdrop-chapter-one-of-our-community-rewards-story/

2. **Final Chapter** — Testers, Contributors, and Cookie Snappers from Season 1  
   Full eligibility details:  
   https://blogs.ten.xyz/airdrop-final-chapter/

3. **Cookie Season 3 Snappers and Cookie MAF Stakers** — participants from Season 3 activities and MAF staking.

Across all of these chapters, a total of **6.150% of the total token supply** is allocated to the Community Airdrop.

---

### Vesting Policy

To support long-term sustainability and reduce short-term volatility, the airdrop is subject to vesting.

:::note Vesting start point
All vesting schedules **start at the TGE date**, regardless of when or on which chain the tokens are claimed.
:::

#### Standard Vesting Terms

For all eligible recipients (unless subject to large-allocation terms below):

- **50% of the allocated tokens unlock at Token Generation Event (TGE).**
- The **remaining 50% are locked for 6 months**, with a **single, one-time unlock after the 6-month period**.
- This one-time unlock will occur **not earlier than 27.05.2025**.

Even if you choose to claim later on **TEN Mainnet** (launch date as per [roadmap.ten.xyz](http://roadmap.ten.xyz/)), your vesting **still counts from TGE**. When you claim on TEN Mainnet, you will be able to claim all tokens that have already vested by that time, including the amounts that would be claimable for someone who claimed on Ethereum at TGE.

#### Large Allocation Vesting 

Recipients with **12,000 or more tokens available at TGE** are considered **Large Allocation Participants** and are subject to a smoother, linear vesting schedule to promote fair distribution and reduce concentration risk:

- The TGE-available portion (the first 50%) unlocks **in weekly tranches of 12,000 tokens** until that portion is fully unlocked.
- After the 6-month lock, the remaining 50% is unlocked using the **same weekly 12,000-token tranche mechanism**, if the remaining balance exceeds 12,000 tokens.
- This creates a gradual unlock pattern rather than a single, large release.

All linear vesting for Large Allocation Participants also **starts counting from TGE**, even if the actual claim happens later or on a different chain. When you eventually claim (on Ethereum or TEN Mainnet), you will be able to claim all tokens that should have unlocked by that date according to the vesting schedule.

:::tip Key idea
Whether you claim on **Ethereum** at TGE or on **TEN Mainnet** later, the amount you can claim at any point is determined by the **same vesting timeline** that always starts at TGE.
:::

---

### Linear Vesting: Examples

<Tabs>
<TabItem value="standard" label="Standard participant">

**Scenario:**  
A participant receives **4,000 tokens** in total.

- At TGE:  
  - 50% unlocks: `4,000 * 0.5 = 2,000 tokens`  
  - 2,000 tokens are immediately claimable at TGE.
- After 6 months (not earlier than 27.05.2025):  
  - Remaining 2,000 tokens unlock in a **single, one-time** event.

There is **no weekly tranche logic** here because the TGE-available amount (2,000) is below 12,000 tokens. If this user waits and claims on TEN Mainnet after its launch, they will see:

- At any time between TGE and 6 months: up to 2,000 tokens claimable (minus anything already claimed).  
- After the 6-month cliff: the full 4,000 tokens claimable (minus anything already claimed).

</TabItem>
<TabItem value="large" label="Large allocation participant">

**Scenario:**  
A participant receives **60,000 tokens** in total.

1. **First 50% at TGE:**

- TGE portion: `60,000 * 0.5 = 30,000 tokens`  
- Because 30,000 ≥ 12,000, the linear vesting applies.

Weekly unlock amount: `12,000 tokens`  
Number of weeks required: `ceil(30,000 / 12,000) = 3 weeks`

- Week 1 after TGE: 12,000 tokens become claimable  
- Week 2: another 12,000 tokens become claimable  
- Week 3: remaining 6,000 tokens become claimable  

2. **Second 50% after 6 months:**

- Second portion: `60,000 * 0.5 = 30,000 tokens`  
- Linear vesting resumes after the 6-month cliff, with the same weekly unlock pattern:

  - Week 1 after the cliff: 12,000 tokens  
  - Week 2: 12,000 tokens  
  - Week 3: 6,000 tokens  

</TabItem>
</Tabs>

#### Simple Vesting Notation

You can think of the vesting logic with the following shorthand:

- `total_allocation` — total tokens allocated to a user  
- `phase_allocation` — amount unlocked in a given phase (TGE or post-6-month)  
- `weekly_unlock` — `12,000` tokens for large allocations  
- `weeks_needed` — `ceil(phase_allocation / weekly_unlock)`  

Unlocked amount after `t` weeks in a phase:

- `unlocked(t) = min(phase_allocation, t * weekly_unlock)`  

Claimable amount at any time:

- `claimable = unlocked_so_far - already_claimed`

All phases measure `t` starting from **TGE** (for the first 50%) or **TGE + 6 months** (for the second 50%), regardless of when/where the user actually claims.

---

### Claim Options

Participants can choose between two claim paths.

:::info Chains overview
- **Ethereum Mainnet** — subject to an additional per-token fee.  
- **TEN Mainnet** — no extra per-token fee, potential ecosystem bonuses, native onbaording to TEN Mainnet.
:::

#### 1. Ethereum Mainnet Claims

Claims on **Ethereum Mainnet** are subject to an **additional custom fee**:

- The fee is set as (to date of TGE) **$0.002 per claimable token** at the date of TGE.

**Example**

If a participant claims **10,000 tokens** on Ethereum:

- Fee: `10,000 * 0.002 = $20`

This fee is independent of gas costs and is specifically tied to the number of tokens being claimed.

#### 2. TEN Mainnet Claims

Claims on **TEN Mainnet**:

- **Do not incur** the $0.002 per-token custom fee.  
- Allow participants to **avoid the additional claim fee** associated with Ethereum.  
- May make participants eligible for **additional community bonuses and incentives** introduced by the TEN ecosystem over time.

All vesting counters and unlock schedules are identical across chains and **start at TGE**. If you claim on TEN Mainnet after its launch (date available on [roadmap.ten.xyz](http://roadmap.ten.xyz/)), you will be able to claim **all tokens that have already vested by that time**, including those that would have been available if you had claimed on Ethereum earlier.

:::tip Practical takeaway
Choosing **TEN Mainnet** for claiming:
- avoids the $0.002 per-token fee applied on Ethereum,
- preserves your full allocation without transactional deductions,
- keeps you eligible for future ecosystem incentives and network-based participation benefits.

Claiming on **Ethereum Mainnet** remains technically available but is generally less optimal due to the additional per-token fee and higher on-chain execution costs.
:::

---

The TEN Community Airdrop, together with its vesting and claim options, is designed to reward meaningful participation, support long-term alignment, and give community members flexibility in how they interact with the TEN ecosystem.
