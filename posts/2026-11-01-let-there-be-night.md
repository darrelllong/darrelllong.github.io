---
title: "Let There Be Night"
date: "2026-11-01"
tags: ["science", "astronomy", "climate", "energy"]
excerpt: "The Good Lord divided the light from the darkness. A startup proposes to sell some of it back. Before we abolish sunset, let us do the arithmetic."
---

> And God saw the light, that it was good: and God divided the light from the darkness. And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.

[Genesis 1:4–5, King James Version.](https://www.biblegateway.com/passage/?search=Genesis+1%3A4-5&version=KJV)

The Good Lord was probably onto something.

![Dracula wears Ray-Bans and shelters under a black parasol above Los Angeles while orbiting mirrors turn midnight into glaring daylight.](/posts/images/let-there-be-night-dracula.png)

*The Count would like a word with the investors.*

Mercury provides a rather severe demonstration of what happens when sunlight arrives and when it stops. Its sunlit surface can reach about 430°C; in darkness it can fall to about −180°C. It has almost no atmosphere to store and redistribute the heat. Its rhythm is nothing like ours. Mercury's rotation is locked to its orbit in a 3:2 resonance: three turns for every two trips around the Sun. One rotation takes about 59 Earth days and one orbit about 88. A complete solar day, including the long interval of darkness, takes 176 Earth days. Its days and nights last for months, rather than hours. [NASA's Mercury facts;](https://science.nasa.gov/mercury/facts/) [NASA on its 3:2 rotation.](https://www.nasa.gov/history/45-years-ago-mariner-10-first-to-explore-mercury/)

Earth has an atmosphere and oceans, which make the arrangement considerably more comfortable. They store heat and move it around. Nevertheless, when the Sun goes down, a large source of incoming energy goes away. The planet continues to radiate heat into space. It does that during the day too. Darkness gives us an interval in which the solar heating stops while the cooling continues.

Apparently there is a business opportunity in correcting this oversight. [Reflect Orbital](https://www.reflectorbital.com/) proposes to sell sunlight reflected from mirrors in orbit. Its published roadmap reaches more than 50,000 satellites by 2035, with services ranging from weak illumination to 300 watts per square meter for three hours at selected sites. The eventual production mirrors are described as 54 meters on a side. Sunset has become something to sell a subscription around. [Kocifaj, Bakos, and Kundracik, *Atmospheric Light Pollution by Proposed Reflect Orbital Space Mirrors*.](https://arxiv.org/html/2608.06433v1)

To first order, Earth is in heat equilibrium. The present warming means the balance is not exact, but the two large terms are nearly equal. Sunlight at Earth's orbit supplies about 1,361 watts per square meter to a surface perpendicular to the rays. Earth intercepts it over a disk and radiates over a sphere with four times that area. Average over the whole planet and the incoming flux is therefore about 340 W/m². Reflect roughly 30 percent back to space, and the absorbed flux is about 240 W/m². In equilibrium, 240 W/m² must also leave. [NASA's account of Earth's energy budget.](https://science.nasa.gov/earth/earth-observatory/climate-and-earths-energy-budget/)

Energy is conserved. Evaporation, winds, and ocean currents can move heat out of a city. They cannot move it off Earth. Space provides no convective heat sink. The absorbed energy remains within the Earth system until radiation carries it into space.

We can put this on the back of an envelope. Let the present global mean surface temperature be $T_0=288$ kelvins, about 15°C, and calibrate a simple outgoing-radiation law to the present energy budget:

$$
F_{\rm out}(T)=240\left(\frac{T}{288}\right)^4\ \mathrm{W/m^2}.
$$

This is a model of radiation escaping the Earth system, calibrated against surface temperature. The surface itself radiates more than 240 W/m²; the atmosphere absorbs and returns much of that radiation. We hold the model's effective greenhouse properties fixed. There is no additional carbon dioxide, water-vapor feedback, changing cloud cover, or melting-ice feedback in this calculation. This is the direct heat calculation; it does not credit any electricity generation or emissions the service might replace.

Suppose we abolished night by supplying the dark hemisphere with as much additional absorbed sunlight as the daylight hemisphere receives. We would double the planet's absorbed power. The temperature in our fixed-properties model would become

$$
T_1=288\,2^{1/4}\approx342.5\ \mathrm K\approx69^\circ\mathrm C.
$$

That is about 54°C warmer. This means matching the daylight hemisphere's total energy input, averaged over its different solar angles. Supplying full-noon sunlight to every square meter of the night hemisphere would add still more energy. At such temperatures the atmosphere itself would change, so 69°C is the result of our fixed-properties experiment, not a precise forecast.

69°C is about **156°F, averaged over the entire planet**. Sherwood and Huber found that 11–12°C of global warming could expose regions containing most of today's population to [heat stress that threatens human habitability](https://pmc.ncbi.nlm.nih.gov/articles/PMC2906879/). Our fixed-properties experiment produces about 54°C of warming. That is Vin Diesel territory. In *The Chronicles of Riddick*, he has to [outrun sunrise on Crematoria](https://www.youtube.com/watch?v=sGihB0gxgko) before it burns him alive. We would roast.

But, of course, we are not going to illuminate the whole Earth. Just the cities.

Los Angeles could become the city of eternal daylight. I doubt New York, Shanghai, Tokyo, or Dubai would concede the market to Los Angeles. So let us add up the population centers and decide what we mean by daylight.

Let $I$ be the incoming mirror power per square meter of the targeted geographic area, before the light interacts with the atmosphere. Use **1,000 W/m²** for a daylight-scale input and **1 W/m²** for a twilight-scale input. These specify incoming energy; atmospheric transmission and the spectrum determine the brightness that reaches the ground.

At equal area and duration, the daylight-scale case delivers a thousand times as much energy as the twilight-scale case.

Count the sunlight entering the Earth system, then subtract the part reflected or scattered back into space:

$$
P_{\rm absorbed}=P_{\rm arriving}-P_{\rm escaping\ sunlight}.
$$

Whatever the atmosphere or the ground absorbs belongs in the same heat budget. Absorption and reflection depend on wavelength; for this envelope, assume a spectrum-averaged **80 percent absorption by the Earth system**, with the remaining 20 percent escaping as sunlight. The service operates for an average twelve hours each night. We also assume the mirrors collect sunlight that would otherwise miss Earth. Moving sunlight from one terrestrial location to another would redistribute energy rather than add the same amount to the planetary total.

For an illuminated area $A$, the daily-average added absorbed power is

$$
P_{\rm added}=0.8\,I\,A\,\frac{12}{24},
$$

where $A$ is in square meters. The daylight-scale input all night adds an average of **400 W/m²**, absorbed across the atmosphere and surface per square meter targeted. Our twilight-scale input adds **0.4 W/m²**. The daylight-scale case supplies 9.6 kilowatt-hours of additional absorbed energy to the Earth system per targeted square meter each night.

For the areas, I used the European Commission's [Global Human Settlement Layer data supporting the UN's 2025 World Urbanization Prospects](https://human-settlement.emergency.copernicus.eu/GHSWUPDownload.php?ds=WUPDUC). I selected the 2025 records, ranked urban centers by population within each country or territory, and summed their geographic footprints. These include the space between buildings, not merely their roofs. The dataset contains 12,140 urban centers in 191 countries and territories. Where a country has fewer than the requested number, it contributes all it has.

Divide the added absorbed power by Earth's entire surface area, $A_E\approx5.10\times10^{14}\ \mathrm{m^2}$, to obtain the global-average addition $\Delta F$. Our equilibrium temperature change is then

$$
\Delta T=288\left[\left(1+\frac{\Delta F}{240\ \mathrm{W/m^2}}\right)^{1/4}-1\right].
$$

Every temperature in the table is an **equilibrium change in the global mean** under the fixed radiative properties of the model. It is the temperature increase approached if the same illumination continues every night, once the additional outgoing radiation balances the added sunlight.

| Areas illuminated every night | Combined area | Daylight-scale input, 1,000 W/m² | Twilight-scale input, 1 W/m² |
|---|---:|---:|---:|
| Los Angeles urban center | 3,699 km² | +0.00087°C | +0.00000087°C |
| Largest city in each country or territory | 103,813 km² | +0.024°C | +0.000024°C |
| Five largest in each | 206,859 km² | +0.049°C | +0.000049°C |
| Ten largest in each | 260,640 km² | +0.061°C | +0.000061°C |
| All 12,140 urban centers | 622,397 km² | +0.146°C | +0.000146°C |

The Los Angeles row uses the dataset's urban footprint, which extends beyond the municipal boundary. The daylight-scale input throughout its twelve-hour night adds about **1.48 terawatts of absorbed heat**, averaged over the whole day.

The ten-per-country case covers 1,372 cities and about 1.8 billion people. At the daylight-scale input it adds about **104 terawatts of absorbed heat**, averaged around the clock, or **0.204 W/m²** averaged over the planet. For an incoming 300 W/m² over the same twelve-hour night, the result is about 0.018°C of equilibrium warming. Restrict that input to three hours and the result falls to about 0.0046°C.

Illuminating all the current urban centers with the daylight-scale input throughout the night adds about **249 terawatts of absorbed power**. At roughly **0.15°C of additional global warming**, our model radiates an extra 249 terawatts into space. That is the new equilibrium: the temperature stops rising because the extra outgoing power balances the extra absorbed power. The twilight-scale case is a thousand times smaller in energy and produces negligible global heating.

The extra 400 W/m² is shared between absorption in the atmosphere and at the surface. It heats air and ground and supplies energy for evaporation. Circulation redistributes that energy within the planet. Calculating a particular city's air-temperature rise would require its weather, water, and heat transport.

Nor can the proposed 50,000-mirror fleet supply the grander scenarios. Fifty thousand squares, each 54 meters on a side, have a total collecting area of about 146 km². Even with perfect collection and delivery, their power ceiling is only

$$
50{,}000\times54^2\times1{,}361
\approx1.98\times10^{11}\ \mathrm W
=198\ \mathrm{GW}.
$$

Even if Earth absorbed every watt of that power continuously, it would add less than **0.0004 W/m²** globally, giving about **0.00012°C of equilibrium warming** in this model. A century of operation at that ideal ceiling would supply at most **0.63 zettajoules**. The announced constellation's direct global heating is negligible. The larger warming figures require a vastly larger industry.

The daylight-scale, ten-per-country scenario requires at least **33 million** such mirrors on energy grounds alone, assuming perfect continuous utilization. Real losses and orbital availability increase that number. All-night service would also require an architecture capable of reaching targets deep into Earth's night; multiplying the proposed low-orbit satellites does not eliminate Earth's shadow. These are calculations of what widespread adoption would require, not a claim that the announced fleet can deliver it.

Now integrate over a century.

If the footprint and service remain constant, the total additional absorbed energy is simply power multiplied by time. A hundred years is about $3.156\times10^9$ seconds. For the ten-per-country case at the daylight-scale input,

$$
E_{100}=(1.043\times10^{14})(3.156\times10^9)
\approx3.29\times10^{23}\ \mathrm J.
$$

That is **329 zettajoules**, with one zettajoule equal to $10^{21}$ joules. Illuminating every current urban center gives about **786 zettajoules** over the same century. The corresponding twilight inputs are **0.329** and **0.786 zettajoules**. Those totals assume the service is operating at the stated scale for the entire hundred years, rather than being gradually built out.

Conservation of energy gives the complete account:

$$
E_{\rm added}(t)=\Delta H(t)+\int_0^t\Delta P_{\rm out}(u)\,du.
$$

Here $\Delta H$ is the added energy still stored in Earth, including its oceans, and $\Delta P_{\rm out}$ is the additional thermal power radiated into space relative to the original balance. Reflected sunlight has already been subtracted from the absorbed input. Every absorbed joule is accounted for. As Earth warms, it radiates more thermal power.

For small temperature changes, the radiation law above gives a response of

$$
\lambda=\frac{4\times240}{288}
\approx3.33\ \mathrm{W\,m^{-2}\,K^{-1}}.
$$

With an effective heat capacity per unit area $C$ and a constant added flux, the simplest time-dependent model is

$$
C\frac{d\Delta T}{dt}=\Delta F-\lambda\Delta T,
\qquad
\Delta T(t)=\frac{\Delta F}{\lambda}\left(1-e^{-t/\tau}\right),
\qquad
\tau=\frac{C}{\lambda}.
$$

To put a timescale on the envelope, choose $C=4\times10^8\ \mathrm{J\,m^{-2}\,K^{-1}}$, equivalent to a 100-meter layer of water spread over the globe. With our radiation law, $\tau\approx3.8$ years. After a century, this model has essentially reached its equilibrium warming: about **0.15°C** for the all-cities case. Its century energy account is

$$
\underbrace{786\ \mathrm{ZJ}}_{\text{absorbed}}
\approx
\underbrace{30\ \mathrm{ZJ}}_{\text{still stored in Earth}}
+
\underbrace{756\ \mathrm{ZJ}}_{\text{additionally radiated into space}}.
$$

The 30 zettajoules remain in the warmer Earth. At equilibrium, further absorbed energy is matched by outgoing thermal radiation, so the temperature no longer rises. This example chooses the thermal mass; changing it changes the rate of warming and the century's division between storage and radiation. The equilibrium temperature does not depend on that choice.

If the illuminated area or incoming power keeps growing, the input grows and the equilibrium moves upward too. The GHSL projection puts urban-center footprints at about a million square kilometers by 2100. Giving that area the daylight-scale input all night would correspond to about **0.24°C of equilibrium warming** in the same model.

Astronomers will hate it. The mirrors would add bright moving sources to the sky, and atmospheric scattering would spread their light well beyond the intended targets. In Kocifaj and his coauthors' model, a single 54-meter mirror produces a sky within the beam bright enough to hide even the brightest stars. Outside the beam, its glow extends over tens of kilometers. These effects occur even when the added heat is negligible on a planetary scale. [Kocifaj and colleagues' atmospheric scattering calculations.](https://arxiv.org/html/2608.06433v1#S6)

We benefit from darkness. Night gives the surface an interval of cooling without direct solar heating. Our biology also depends on the cycle. This is Biology 101: circadian rhythms. The daily alternation of light and dark synchronizes biological clocks in humans and other animals. Those clocks regulate sleep, feeding, hormone release, and body temperature. Keeping the lights on through the night interferes with those signals, even when the added energy is too small to produce much global warming. [NIH on circadian rhythms.](https://www.nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms)

The proposal strikes me as hubris. Darkness is something we share and need, and a company's ability to put a reflector in orbit does not establish its right to decide who gets a night. I often say to my fellow engineers, "Just because you can does not mean that you should."

Lowell Wood was a font of crazy ideas on this scale. With Edward Teller and Roderick Hyde, he proposed [placing a scattering screen between Earth and the Sun](https://www.nationalacademies.org/read/10798/chapter/6) to control the amount of sunlight reaching the planet. Fortunately, that planetary sunshade remains unbuilt. Even a [2026 sunshade roadmap](https://doi.org/10.1016/j.asr.2026.04.007) puts initial operations in 2040. It reminds me of undergraduate computer scientists who announce, "You just need to ..." When I hear that, I know they are wrong. There is no "just need to" panacea. The work is in the consequences that the word "just" leaves out.

I am not a physicist, just a humble engineer. Although, last July I was dubbed a physicist in a ceremony over dinner: a real one tapped me on the shoulders with a small knife. Too few scientists think through the entire chain of consequences. The calculation must follow the energy through the atmosphere, the ground, the oceans, and back into space. The engineering must also account for the people and ecosystems under the light, the astronomers outside the beam, and the people who never agreed to any of it.

This is not a peer-reviewed scientific calculation, just me and my HP 48GX. But back-of-the-envelope calculations can reveal truths. Of course, if you are afraid of Dracula, perhaps this is a good idea.
