---
title: Investment Appraisal
date: 2021-11-24
---

An investment appraisal is used to assess the financial implications of a
business case.

<!-- more -->

When documenting, always use a currency.

## Time-Value

_Time-value_ refers to the value of an item relative to a point in time.
Currency is a prime example of this, as inflation dictates the value of $1 today
will worth less in a year's time.

Applying this concept to a project means its projections need to account for the
value of returns relative to the time.

From the perspective of the investors, this is referred to a _return on
investment_, i.e., breaking even one year later is ultimately a loss.

### Calculations

_Present value_ {% math PV %} is an amount of money at-present.

_Future value_ {% math FV %} is an amount of money in the future, corresponding
to some prevent value.

_Interest_ is the annual rate {% math R %} at which the present value changes;
_discount_ applies to future value retrospectively.

Lastly, the rates are applied across a number of annual periods {% math N %}.
Since the rate for a given year is derived from the year previous, they are
applied cumulatively.

{% caption "Present & Future Value Formulae" %}

{% display_math FV = PV(1 + R)^{N}  %}

{% display_math "PV = \\frac{PV}{(1 + R)^{N}}"  %}

{% endcaption %}

For example, 10% interest turns $1 into $1.10 across one year:
{% math "1(1 + 0.1)^1 =  \\$1.10" %}.

## Methods of Appraisal

### Payback

Payback is the most simple method, as it assumes the time-value of money remains
the same.

{% caption "Example of Payback calculations" %}

| Item                                   | Year 1 | Year 2      | Year 3      | Year 4     | Year 5    |
| -------------------------------------- | ------ | ----------- | ----------- | ---------- | --------- |
| Hardware Purchase                      | 500    | 0           | 0           | 0          | 0         |
| Hardware Maintenance                   | 50     | 50          | 50          | 50         | 50        |
| Software Purchase                      | 180    |
| Software Support                       | 20     | 20          | 20          | 20         | 20        |
| **Cumulative Costs**                   | 750    | 820         | 890         | 960        | 1,030     |
|                                        |
| Staff savings (per year)               | 220    | 220         | 220         | 220        | 220       |
| **Cumulative Savings**                 | 220    | 440         | 660         | 880        | 1,100     |
|                                        |
| **Cumulative Net Return** (Difference) | -530   | -380 (+150) | -230 (+150) | -80 (+150) | 70 (+150) |

{% endcaption %}

### Net Present Value

The _Net Present Value (NPV)_ of the project applies a discount rate to the
project's returns.

From the payback example, the initial (year 1) costs were $530. Each following
year had a net return of $150, resulting in a $70 profit at year 5. However,
this does not account for an changes in the value of currency.

By applying a discount rate of 0.2 (20%), the value of the project can be
calculated relative to the present value; more importantly, the profits become
relative to the initial costs:

{% caption "Example of NPV calculations" %}

| Year | Net Profit (FV) | Rate                                | Net Profit (PV) |
| ---- | --------------- | ----------------------------------- | --------------- |
| 1    | -530            | {% math 1\div{}(1.2)^0  = 1      %} | -530            |
| 2    | +150            | {% math 1\div{}(1.2)^1  = 0.833  %} | 125             |
| 3    | +150            | {% math 1\div{}(1.2)^2  = 0.694  %} | 104             |
| 4    | +150            | {% math 1\div{}(1.2)^3  = 0.579  %} | 87              |
| 5    | +150            | {% math 1\div{}(1.2)^4  = 0.482  %} | 72              |
|      |                 |                                     | -141 👎         |

{% endcaption %}

### Internal Rate of Return

_Internal Rate of Return (IRR)_ uses sensitivity analysis, which applies best
case and worst case scenarios determine the elasticity of the costs. By
providing a range of potential investment options, both the project management
team and potential customers can understand the project's viability in different
contexts.

IRR uses the same calculations as above, with changes to the input data, e.g.,
investment period, initial cost(s), net profit.
