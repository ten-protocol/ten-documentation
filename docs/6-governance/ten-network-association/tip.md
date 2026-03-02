---
sidebar_position: 4
---

# TEN Improvement Proposals (TIP)

A TEN Improvement Proposal (TIP) is the primary mechanism for the community to shape the evolution of the TEN Network. To balance **security** with **agility**, TEN utilizes a tiered governance model. 

Depending on the impact of the proposal, it will follow either the **Fast-Track** or the **Traditional** lifecycle.

---

## TIP Structure
Regardless of the lifecycle chosen, all proposals must follow the **SMARTKIT** approach to ensure quality and technical rigor:

1. **Summary**: A brief overview of the proposal.
2. **Motivation**: Why is this change necessary?
3. **Alignment**: How does this fit TEN’s mission and values?
4. **Risks**: Potential downsides or security considerations.
5. **Terms**: Definitions for specific terminology (optional).
6. **Key Details**: Technical design, platforms, and alternate options considered.
7. **Implementation**: Required resources, costs, and technical expertise.
8. **Timing**: Start date, milestones, and completion dates.

---

## Governance Tiers: Which Lifecycle to Use?

| Tier | Type of Change | Lifecycle | Platform |
| :--- | :--- | :--- | :--- |
| **Tier 1: Non-Constitutional** | Grants, parameters, guidelines, social votes. | **Fast-Track** | Snapshot |
| **Tier 2: Constitutional** | Core software upgrades, logic changes, L1-bridge updates. | **Traditional** | Snapshot + Tally |

---

## 1. The "Fast-Track" Lifecycle (10 Days)
The Fast-Track is used for high-velocity decisions that do not require deep protocol-level code changes.

| Level | Stage | Description | Timeframe |
| :--- | :--- | :--- | :--- |
| **1** | **Proposal & Delay** | Published on Snapshot; active discussion period. | Days 1–4 |
| **2** | **Active Voting** | Voting is open to the community on Snapshot. | Days 5–9 |
| **3** | **Review & Execution** | Implementation by the Board/Core Team. | Day 10 |

* **Execution**: Changes are triggered manually or via multisig.
* **Safety**: The Governance Board serves as a safety backstop to prevent malicious execution.

---

## 2. The "Traditional" Lifecycle (~37 Days)
The Traditional Cycle is reserved for **Constitutional** proposals. These are changes that modify the core protocol, upgrade smart contracts, or affect the security of the L2-to-L1 bridge. This cycle includes mandatory "cooling-off" periods to ensure maximum security.

| Level | Stage | Platform | Timeframe |
| :--- | :--- | :--- | :--- |
| **1** | **Temperature Check** | Forum + Snapshot | 7 Days |
| **2** | **On-chain Voting Prep** | Tally / On-chain | 3 Days |
| **3** | **On-chain DAO Vote** | Tally | 14 Days |
| **4** | **Reaction Period** | Cooling-off | 3 Days |
| **5** | **L2-to-L1 Finalization** | Ethereum Mainnet | 7 Days |
| **6** | **Implementation** | Automated / TEE | Minutes |

### Detailed Breakdown
* **Level 1: Temperature Check (7 Days)**: An initial signal vote on Snapshot. A simple majority is required to move to the formal on-chain stage.
* **Level 2: Voting Prep (3 Days)**: The proposal is uploaded to the on-chain Governor contract. This delay allows delegates to "lock in" their voting power.
* **Level 3: On-chain Vote (14 Days)**: The formal, binding vote. This requires reaching a **Quorum** (e.g., 5% of total circulating supply).
* **Level 4: Reaction Period (3 Days)**: A safety window allowing users who disagree with the outcome to exit the system or adjust their positions before the code change takes effect.
* **Level 5: Ethereum Finalization (7 Days)**: For bridge or logic upgrades, this period ensures the L2 state is finalized on Ethereum Mainnet.
* **Level 6: Implementation**: The code is executed automatically via the protocol’s scripts or in the future with TEE based solutions.
---

## Additional Waiting Periods
For breaking changes or major hard-forks, the Governance Board may mandate additional waiting periods to allow ecosystem partners (exchanges, indexers, dApps) to prepare for the update.

## Conclusion
The tiered approach ensures that we remain the fastest-moving L2 for ecosystem growth while maintaining the right standards of security for the protocol's core foundation.
