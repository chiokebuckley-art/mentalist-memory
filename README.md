# Mentalist Memory

A standalone, mobile-friendly memory-training app, from first principles to advanced mnemonic practice. It is built with plain HTML, CSS, and JavaScript modules and has no runtime dependencies, external scripts, paid APIs, or account service.

## Open the app

Serve the repository root with any static web host. The files use relative paths, so they work at a domain root or a GitHub Pages subdirectory. Opening `index.html` directly through `file://` may block JavaScript module loading; use an HTTP server.

For ordinary local development outside the managed Sites environment:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080`. To use a new GitHub Pages repository, select **Deploy from a branch → main → /(root)** in repository Settings → Pages. No build step or API key is needed.

## GitHub Pages setup

In **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**. Once GitHub finishes deployment, the app address is `https://chiokebuckley-art.github.io/mentalist-memory/`. The presence of this address in the README does not mean Pages is enabled yet; check the repository deployment status.

When moving from the previous ChatGPT Site, export your profile in Settings there, then import it into the GitHub Pages app. Browser storage does not automatically transfer between these origins.

## Teaching method

Attend → understand → encode → organize → retrieve → check and repair → space → apply.

The course contains eight chapters and 24 original lessons. Each now opens with a three-frame visual demonstration: **See it → Connect it → Recall it**. A short caption and optional browser read-aloud accompany each frame; longer explanations stay collapsed. A concept check completes the lesson:

1. Attention, reversible associations, and active recall.
2. Linking, meaningful chunks, and error repair.
3. Familiar routes, item-location binding, and interference.
4. Numbered pegs and random-position recall.
5. Major sound code, a 00–99 image vocabulary, and digit sequences.
6. Respectful name-face associations and real-world practice.
7. Card codes, an optional PAO extension, and shuffled-deck recall.
8. Understanding, performance rehearsal, and task-specific mastery.

Seven scored drill modes cover paired associations, ordered words, memory palaces, random-position pegs, two-digit number pairs, illustrated names/faces, and fresh card shuffles. Additional component drills practice number, peg, and card codes in both directions. PAO has an editable codebook and six-digit scene decoding. The notebook supports personal question/answer/cue cards with self-assessed spaced review.

## Visual learning

The training supports learners who find it difficult to form mental pictures. Use the displayed pictures, say a connection, point, or follow the movement; vivid internal imagery is not required. This interface adaptation is not a diagnosis or treatment.

- 72 illustrated teaching frames, replayable examples, and reveal/hide exercises.
- One study item and one recall question at a time, starting with three items.
- Original labeled SVG illustrations for 109 core objects, all 100 starter number cues, all 52 card cues, and ten pegs. Custom cues without matching artwork stay clearly labeled as word cues.
- Bump, lift, and spin actions connect pictures; palace practice visibly places each item at its location. Unknown custom locations use a neutral location marker.
- Optional speech uses browser speech synthesis when available. Animations respect reduced-motion settings.
- Guided answer choices build familiarity. Switch to independent typed recall when ready; picture-choice scores are recorded separately and cannot award mastery.
- Existing profiles, codebooks, routes, and progress remain compatible. No reset or account migration is needed.

## Progress and assessment

- Default practice is self-paced; optional study limits are 30, 60, 120, or 300 seconds.
- Pausing hides material and excludes paused time. Focus mode hides navigation.
- In independent recall, study answers are removed from the rendered UI. Guided practice intentionally presents four answer choices, including the correct answer. This is an educational tool, not a tamper-proof exam.
- “Need another look” marks a trial as assisted and excludes it from mastery.
- Completed sets are preserved for a hidden-answer retest after 24 hours.
- Failed or assisted retests are scheduled again 24 hours after corrective feedback. Successful unassisted retests leave the queue; choice-based retests remain guided recognition and do not count toward mastery.
- Palace routes with pending retests are reserved to reduce conflicting associations.
- Independent-recall recommendations increase length after two ≥90% attempts at the same length and reduce it after <70%; the learner can override the size.
- A chapter mastery badge requires its three lesson checks, three unique fresh independent, unaided passes at ≥90% at the chapter's minimum length, practice across two local calendar dates, and an independent, unaided ≥90% retest at least 24 hours after study.
- Chapter target lengths: 5 associations, 10 words, 20 palace items, 10 peg items, 10 number pairs (20 digits), 10 names, 20 cards, and 20 ordered words for the integration chapter. The integration badge measures the app drill, not independently verified real-world transfer.
- Thresholds and schedules are transparent product choices, not validated standards or a guarantee of expert performance. The curriculum is not a medical treatment and does not claim photographic memory, mind reading, or general intelligence gains.

## Persistence and privacy

Profiles, routes, codes, results, review sets, and notes are saved to browser `localStorage` under `mentalist-memory.v1`. Profiles are not authenticated accounts and do not synchronize automatically across devices or origins. JSON export/import transfers profiles as separate copies and validates the data; CSV exports the practice log. Browser data clearing removes local progress. Keep backups private if they contain personal notes.

No personal details from the commissioning user's history are embedded in the app. Faces are original procedural illustrations, not photos or identified people. Name drills are association exercises; real-world face recognition needs separate practice. Object and code illustrations are original SVG drawings, paired with labels. Learners may use the visible art, sound, actions, or verbal associations.

## Evidence

The supplied *Mentalist Memory Training Guide* informed the technique inventory and progression; it is not redistributed. Research was checked on October 18, 2026. The app's Method page provides these sources and limits:

- Dresler et al. (2017), *Mnemonic Training Reshapes Brain Networks to Support Superior Memory*. [DOI](https://doi.org/10.1016/j.neuron.2017.02.003). Strategy training improved performance on the studied word-recall tasks. It does not validate this app or establish broad transfer.
- Karpicke & Roediger (2008), *The Critical Importance of Retrieval for Learning*. [DOI](https://doi.org/10.1126/science.1152408). Retrieval after an initial correct answer supported delayed vocabulary recall in the experiment.
- Cepeda et al. (2008), *Spacing Effects in Learning*. [DOI](https://doi.org/10.1111/j.1467-9280.2008.02209.x). Useful intervals depend on retention goals; there is no single universally optimal spacing schedule.
- Soderstrom, Kerr & Bjork (2016), *The Critical Importance of Retrieval—and Spacing—for Learning*. [DOI](https://doi.org/10.1177/0956797615617778). Spacing affects comparisons between studying and testing; both can help. The course uses study, recall, and feedback together.

These sources support general training principles. The lesson sequence, thresholds, and exact exercises are instructional design proposals, not research-tested interventions.

## Validation

```sh
npm test
```

Seventeen passing Node tests cover curriculum/codebook integrity, exact scoring and leading zeroes, full deck uniqueness, every drill generator, delayed snapshots and timing, failed/assisted retests, mastery gates, route reservation, adaptive size suggestions, backup validation, notebook scheduling, and interface render/event flows (lessons, scoring, assistance, toolkit, profile isolation, and imports). They also cover all 72 visual lesson frames, illustration coverage, one-item study/recall and guided-choice flows, backward-compatible profiles, and exclusion of recognition scores from mastery.

The lightweight interface test uses a DOM stub; it does not validate browser layout. `node --check` passes for all five JavaScript modules. SVG illustration contact sheets were rendered and visually inspected; ambiguous object drawings were refined. The managed preview service could not start because its sandbox could not mount `/proc` (`bwrap: Can't mount proc ... Operation not permitted`). Consequently real-browser interaction, visual layout, mobile viewport behavior, and accessibility-tree QA remain unverified. No browser was installed or alternate preview service substituted.

## Files

- `index.html`, `style.css`, `icon.svg`: responsive shell and original vector artwork.
- `curriculum.js`: lessons, source summaries, stimulus banks, number/card codes.
- `coach.js`: compact visual lesson steps and demonstrations.
- `visuals.js`: deterministic original SVG pictures, routes, and association scenes.
- `engine.js`: generation, scoring, mastery, scheduling, and backup validation.
- `app.js`: views, practice state machine, profile persistence, and events.
- `tests/`: deterministic logic tests and interface event smoke tests.

This is the standalone Mentalist Memory repository. Application files live at the repository root so GitHub Pages can publish main / (root) directly. No build step or secrets are required.
