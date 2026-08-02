# Mentor accuracy test

Upload `deosai_catalogue.csv` in **Dashboard → Setup → Knowledge & Data**, then ask these questions in the Playground.

| Question | Expected grounded result |
| --- | --- |
| What is the price of the necklace? | Layered Pendant Necklace costs PKR 1,200. |
| Is the necklace available? | Layered Pendant Necklace is in stock. |
| What are the delivery charges? | PKR 200 nationwide; free delivery in Lahore. |
| How long does delivery take? | 2-4 working days. |
| What is the return policy? | Exchange within 7 days for unworn items with original packaging; custom items are non-refundable. |
| Is the leather wallet available? | Safe handoff because the CSV does not contain a leather wallet. |

The assistant reads these answers from exact CSV fields. If a requested field is missing or if uploaded sources disagree, it must hand the conversation to the seller instead of guessing.
