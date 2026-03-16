Alternative Kitchen / Energy Resilience E-commerce Website Spec (Name : Solstric )

Product and Business Context

This website is for a startup selling alternative cooking, power-backup, and energy-resilience products in Delhi first, with expansion to MP towns/villages and retailer bulk orders.

The phase-1 site should be UI-first and conversion-focused, with ordering handled primarily through WhatsApp and call confirmation, while preserving a structure that can later support a full backend, cart, login, checkout, inventory, and lead workflows.

The business has four broad product families:
	1.	Alternative cooking products
	2.	Solar and power-backup products
	3.	Rural / hybrid kitchen products
	4.	Bulk / retailer / commercial solutions

⸻

1. Product Strategy for Website Structure

1.1 Primary product categories

Create top-level product categories as follows:
	1.	Alternative Cooking
	•	Induction cooktops
	•	Electric rice cookers
	•	Electric pressure cookers
	•	Multicook kettles
	•	Insulated casseroles
	•	Induction-compatible cookware
	2.	Solar & Power Backup
	•	Rooftop solar starter systems
	•	Portable solar kits
	•	Inverters
	•	Batteries
	•	Portable power stations
	•	DC appliances
	•	Solar combo kits
	3.	Village / Hybrid Kitchen
	•	Smokeless stoves
	•	Hybrid kitchen kits
	•	Rural cookware bundles
	•	Pellet / biomass accessories
	•	Village energy kits
	4.	Commercial / Stall Solutions
	•	Food stall electric kits
	•	Bulk cooking appliances
	•	Commercial induction setups
	•	Hot holding and insulated containers
	•	Workstation bundles
	5.	Retailer / Bulk Orders
	•	Dealer starter packs
	•	Bulk mixed cartons
	•	District distribution packs
	•	Reseller support kits

1.2 Product hierarchy and URLs

Recommended URL pattern:
	•	/category/alternative-cooking
	•	/category/solar-power-backup
	•	/category/village-hybrid-kitchen
	•	/category/commercial-stall-solutions
	•	/category/retailer-bulk-orders

Product detail pages:
	•	/category/solar-power-backup/rooftop-solar-starter-kit-1kw
	•	/category/alternative-cooking/single-induction-starter-kit
	•	/category/commercial-stall-solutions/food-stall-electric-starter-kit

City or geo landing pages:
	•	/delhi/induction-cooktop
	•	/delhi/solar-backup-for-small-shops
	•	/mp/village-hybrid-kitchen-kit
	•	/rewa/smokeless-stove-dealer
	•	/bhopal/retailer-bulk-kitchen-appliances

Informational SEO pages:
	•	/guides/induction-vs-lpg-for-delhi-homes
	•	/guides/solar-vs-inverter-for-small-shops
	•	/guides/smokeless-stove-vs-traditional-chulha
	•	/guides/how-to-start-a-retailer-business-with-energy-products

⸻

2. Conversion Strategy

2.1 Phase-1 order flow

For the first version, the website should support:
	•	Add to cart UI
	•	Buy now UI
	•	Bulk order UI
	•	WhatsApp order handoff
	•	Call request form
	•	Dealer enquiry form

Actual order completion can be handled through:
	•	WhatsApp chat
	•	phone call
	•	manual CRM spreadsheet or simple admin dashboard later

2.2 Login strategy

For phase 1, do not force account creation.

Recommended approach:
	•	Guest browsing for all users
	•	Optional cart persistence only in browser/local storage
	•	At checkout, collect:
	•	full name
	•	phone number
	•	email (optional)
	•	city/state
	•	full shipping address
	•	order type (retail / bulk)
	•	Then push user to:
	•	WhatsApp order confirmation
	•	call request submission
	•	form submission for backend follow-up

Optional later:
	•	OTP verification at checkout only
	•	no password-based login initially
	•	account system only when order volume justifies it

2.3 WhatsApp-first interaction pattern

Every conversion page should have:
	•	Sticky WhatsApp CTA
	•	“Ask for best price on WhatsApp” button
	•	“Confirm stock on WhatsApp” button
	•	“Talk to an expert” CTA
	•	product-preloaded WhatsApp message

Example prefilled WhatsApp text:
	•	“Hi, I want to enquire about the Food Stall Electric Starter Kit for Delhi.”
	•	“Hi, I am a retailer from Rewa and need bulk pricing for smokeless stove kits.”

⸻

3. Admin-Controlled Merchandising

3.1 Top products switch

Need a simple content-controlled switch/flag system per product:
	•	show_on_homepage
	•	show_in_featured_category
	•	show_in_trending
	•	show_in_ads_landing
	•	show_in_retailer_page
	•	priority_rank

This will allow non-technical control of:
	•	featured products on homepage
	•	category hero products
	•	seasonal or ad-driven products
	•	city-specific promotions

3.2 Content-management design

Even in UI-only version, design the content model as if CMS-backed later.
Each product should support:
	•	name
	•	slug
	•	short subtitle
	•	main category
	•	subcategory
	•	product family
	•	key benefits
	•	suitable use cases
	•	city relevance tags
	•	rural / urban tags
	•	retail / bulk tag
	•	price display or “Get best price” mode
	•	MOQ for bulk
	•	image gallery
	•	specification blocks
	•	FAQs
	•	compare-to alternatives
	•	lead CTA text
	•	WhatsApp message template

⸻

4. Complete Sitemap and Page-by-Page Design

4.1 Public website pages

1. Home page

Goal

Instantly explain the business, product families, geographies served, and push high-intent users to product pages or WhatsApp.

Sections
	1.	Header
	•	Logo
	•	Search bar
	•	Nav links
	•	Categories mega menu
	•	Bulk orders link
	•	Blog / guides link
	•	Contact / WhatsApp CTA
	2.	Hero section
	•	Headline around alternative kitchens / energy resilience
	•	Subheadline explaining Delhi + MP coverage
	•	Primary CTA: Shop Products
	•	Secondary CTA: Bulk / Retailer Enquiry
	•	Tertiary CTA: Chat on WhatsApp
	•	Product family quick chips
	3.	Problem-solution strip
	•	LPG uncertainty
	•	power backup need
	•	village hybrid cooking need
	•	small business continuity
	4.	Featured categories
	•	Alternative cooking
	•	Solar & backup
	•	Village kitchen
	•	Commercial kits
	•	Bulk dealer packs
	5.	Featured products carousel/grid
	•	uses top product switch
	6.	Shop by use case
	•	Home backup kitchen
	•	Small food stall
	•	PG / hostel
	•	Village home
	•	Retailer bulk buying
	•	Small shop solar backup
	7.	City / location blocks
	•	Delhi
	•	NCR
	•	Rewa
	•	Bhopal
	•	Jabalpur
	•	MP villages
	8.	Why choose us
	•	curated products
	•	WhatsApp support
	•	bulk ordering
	•	local guidance
	•	installation support where applicable
	9.	Expert content section
	•	guides
	•	comparisons
	•	local SEO pages
	10.	Retail partner banner

	•	become dealer / reseller

	11.	Testimonials / trust strip

	•	customer story cards
	•	retailer partner logos later

	12.	FAQ summary
	13.	Footer

	•	categories
	•	cities
	•	help links
	•	policies
	•	contact
	•	WhatsApp

⸻

2. Category landing page

Example: /category/solar-power-backup

Goal

Rank for category keywords and drive users into product pages or WhatsApp.

Sections
	1.	Breadcrumbs
	2.	Category hero
	•	title
	•	short intro
	•	city relevance note
	•	CTA to WhatsApp
	3.	Filter bar
	•	price range
	•	use case
	•	retail / bulk
	•	city relevance
	•	availability mode
	4.	Featured products row
	5.	Product grid
	6.	Comparison strip
	•	good / better / best
	7.	Category explainer content
	8.	Related guides
	9.	Bulk order CTA
	10.	FAQ section
	11.	Related categories

Each category page should include a descriptive SEO body explaining:
	•	what the product category is
	•	who it is for
	•	how to choose products
	•	Delhi / MP relevance
	•	common buying mistakes
	•	why talk to team on WhatsApp

⸻

3. Product detail page

Example: /category/alternative-cooking/single-induction-starter-kit

Goal

Drive direct enquiry / add-to-cart / WhatsApp conversion.

Above-the-fold layout
	•	product image gallery on left
	•	title, short subtitle, use-case labels on right
	•	price or price range
	•	availability text
	•	quantity
	•	add to cart button
	•	buy on WhatsApp button
	•	bulk enquiry button
	•	save / compare icon

Sections
	1.	Key highlights row
	2.	Product description
	3.	Best for / not ideal for
	4.	Specifications block
	5.	What is included in the box
	6.	Delivery coverage / serviceability
	7.	Bulk pricing teaser
	8.	Product variants
	9.	Compare with similar products
	10.	FAQ for this product
	11.	Expert advice note
	12.	Related products
	13.	Related guides / blog articles
	14.	Sticky mobile CTA bar

Product page content requirements

Every product page should have:
	•	practical usage context
	•	city relevance
	•	retailer suitability
	•	who should not buy this
	•	alternative recommendation
	•	WhatsApp CTA every few sections

⸻

4. Search results page

Goal

Help users discover products fast.

Sections
	•	search bar with editable query
	•	filters
	•	results count
	•	product cards
	•	suggested categories
	•	suggested guide articles
	•	“did you mean” support
	•	no-result fallback with WhatsApp CTA

⸻

5. Cart page

Goal

Support future ecommerce readiness while still enabling WhatsApp order handoff.

Sections
	•	cart items list
	•	product summary
	•	edit quantity
	•	estimated subtotal
	•	retail vs bulk note
	•	checkout CTA
	•	WhatsApp order CTA
	•	continue shopping
	•	suggested add-ons

Phase 1 note:
	•	cart can be local-storage based only

⸻

6. Checkout page

Goal

Capture order intent even before full backend exists.

Sections
	1.	Contact details
	•	name
	•	phone
	•	email optional
	2.	Address details
	•	address line 1
	•	address line 2
	•	city
	•	district
	•	state
	•	pincode
	3.	Order type
	•	home use
	•	business use
	•	retailer bulk order
	4.	Business fields shown conditionally
	•	shop / company name
	•	GSTIN optional
	•	estimated monthly volume
	5.	Payment preference
	•	cash on delivery interest
	•	bank transfer
	•	discuss on WhatsApp
	6.	Order notes
	7.	CTA buttons
	•	Place order on WhatsApp
	•	Request callback
	•	Submit order enquiry

OTP strategy

If verification is needed later, add OTP on phone or email only at final submission stage, not at browsing stage.

⸻

7. Order success / enquiry success page

Goal

Keep the user moving after submission.

Sections
	•	thank-you message
	•	reference ID
	•	WhatsApp deep link
	•	expected callback timeline message
	•	related products
	•	guide articles
	•	dealer program CTA if relevant

⸻

8. Bulk / dealer landing page

Example: /bulk-orders

Goal

Convert retailers, wholesalers, dealers, and resellers.

Sections
	1.	Hero for bulk buyers
	2.	Why partner with us
	3.	Product lines available in bulk
	4.	MOQ slabs
	5.	Indicative pricing model (or quote-based)
	6.	Who can become a dealer
	7.	District/city coverage areas
	8.	Step-by-step order process
	9.	Bulk enquiry form
	10.	CTA to WhatsApp sales team
	11.	FAQ for retailers
	12.	testimonials / partner logos later

Fields in bulk enquiry form
	•	owner name
	•	business name
	•	mobile number
	•	email
	•	state
	•	district
	•	shop type
	•	interested categories
	•	estimated order value
	•	message

⸻

9. City / local SEO landing pages

Examples:
	•	/delhi/backup-kitchen-products
	•	/delhi/induction-cooktop-store
	•	/rewa/village-hybrid-kitchen
	•	/bhopal/retailer-bulk-solar-products

Goal

Capture local search intent and send the user to category, product, or WhatsApp.

Sections
	1.	City hero headline
	2.	Short trust statement
	3.	Products most relevant to that city
	4.	Local buying scenarios
	5.	Local delivery / consultation note
	6.	Category shortcuts
	7.	Featured products
	8.	Bulk or dealer CTA for that geography
	9.	Local content block
	10.	FAQs for that city
	11.	Related nearby city pages

Important rule

These pages must not be thin or copy-paste duplicates. Each city page needs:
	•	city-specific intro
	•	relevant use cases
	•	different product emphasis
	•	different questions and buying advice

⸻

10. Guide / blog listing page

Example: /guides

Goal

Build topical authority, internal linking, and ad/support content.

Sections
	•	hero intro
	•	featured guides
	•	latest posts
	•	compare articles
	•	local guides
	•	retailer resources
	•	search / filter by topic
	•	CTA to explore products

⸻

11. Individual guide article page

Example: /guides/induction-vs-lpg-for-delhi-homes

Goal

Rank for informational keywords and guide users to a product or contact path.

Page structure
	1.	Article hero
	2.	author / reviewed by line
	3.	table of contents
	4.	intro summary box
	5.	full article content
	6.	comparison tables/cards
	7.	recommended products inline
	8.	city-specific note where relevant
	9.	CTA banner mid-article
	10.	FAQ section
	11.	related guides
	12.	related product cards
	13.	contact CTA

Content clusters to create
	•	comparison articles
	•	beginner guides
	•	city-specific buying guides
	•	retailer business guides
	•	village setup guides
	•	solar backup guides
	•	stall setup guides

⸻

12. Comparison hub page

Example: /comparisons

Goal

Central place for bottom-funnel SEO.

Comparison topics
	•	induction vs LPG
	•	solar vs inverter
	•	smokeless stove vs traditional chulha
	•	rice cooker vs pressure cooker
	•	portable power station vs inverter battery
	•	electric cooking for stall vs LPG

Each comparison page should follow:
	•	summary decision box
	•	who should choose option A
	•	who should choose option B
	•	price and practicality discussion
	•	suggested products
	•	CTA

⸻

13. About page

Goal

Build trust and explain the mission.

Sections
	•	company story
	•	why this category matters
	•	the regions served
	•	how products are selected
	•	support model
	•	future plans
	•	partner / retailer invitation

⸻

14. Contact page

Sections
	•	WhatsApp button
	•	phone number
	•	enquiry form
	•	business hours
	•	service areas
	•	map or office note later
	•	separate sales / bulk / support contact blocks

⸻

15. FAQ page

Sections
	•	ordering
	•	WhatsApp ordering
	•	delivery
	•	installation support
	•	bulk orders
	•	returns and warranty
	•	retailer onboarding
	•	city coverage

⸻

16. Policies pages

Need:
	•	Privacy Policy
	•	Terms and Conditions
	•	Shipping Policy
	•	Returns / Refund Policy
	•	Warranty / Support Policy
	•	Bulk Order Policy

⸻

5. Screen-Level Components and Reusable UI Blocks

5.1 Common reusable components

Design the system around reusable components:
	•	announcement bar
	•	nav header
	•	mega menu
	•	category card
	•	product card
	•	comparison card
	•	city card
	•	CTA banner
	•	WhatsApp CTA block
	•	testimonial card
	•	FAQ accordion
	•	content callout box
	•	lead form block
	•	breadcrumb
	•	sticky mobile CTA bar

5.2 Product card structure

Each product card should include:
	•	image
	•	title
	•	short subtitle
	•	price or “Get best price”
	•	tags like home / village / bulk / solar
	•	quick actions
	•	view details
	•	add to cart
	•	WhatsApp

⸻

6. Local SEO Architecture

6.1 Page types to support local SEO
	1.	City pages
	2.	category + city pages
	3.	guide + city pages
	4.	retailer pages by state/district
	5.	product detail pages
	6.	comparison pages

6.2 Content cluster examples

Cluster: Delhi alternative kitchen
	•	Delhi induction guide
	•	Delhi stall backup solutions
	•	Delhi LPG alternative comparisons
	•	Delhi electric cooking category page

Cluster: MP village kitchen
	•	hybrid village kitchen in MP
	•	smokeless stove for MP homes
	•	retailer pages for Rewa/Bhopal/Jabalpur/Satna
	•	bulk dealership pages

Cluster: solar and backup
	•	solar for small shops
	•	inverter vs portable power station
	•	solar for village homes
	•	solar backup for food stalls

6.3 Blog / article taxonomy

Suggested sections:
	•	Guides
	•	Comparisons
	•	Local buying guides
	•	Retailer business guides
	•	Expert articles
	•	Product explainers

⸻

7. Information Architecture for Future Backend

Even for UI-only version, design for future backend entities.

Core entities
	•	Product
	•	Category
	•	Subcategory
	•	Collection
	•	City page
	•	Guide article
	•	Comparison article
	•	Lead / enquiry
	•	Cart
	•	Bulk enquiry
	•	Retail partner enquiry
	•	Featured switch flags
	•	FAQ item
	•	Review / testimonial

Future admin capabilities

Later admin should support:
	•	add/edit product
	•	change featured flags
	•	create category banners
	•	create city pages
	•	add blog posts
	•	assign products to articles
	•	manage bulk leads
	•	export enquiries

⸻

8. Recommended Navigation

Main nav
	•	Shop Products
	•	Categories
	•	Solar & Backup
	•	Village Kitchen
	•	Bulk Orders
	•	Cities
	•	Guides
	•	About
	•	Contact

Mega menu under Categories
	•	Alternative Cooking
	•	Solar & Power Backup
	•	Village / Hybrid Kitchen
	•	Commercial / Stall Solutions
	•	Retailer / Bulk Packs

⸻

9. Homepage Personalization / Merchandising Logic

Need configurable homepage blocks:
	•	trending now
	•	featured by city
	•	best for stalls
	•	best for villages
	•	best for retailers
	•	seasonal solar products
	•	ad-tested products

This allows quick experimentation without code rewrites later.

⸻

10. Ads-Landing Page System

Create dedicated landing page templates for ads.

Templates needed
	1.	Category ad landing page
	2.	Product ad landing page
	3.	Bulk / dealer lead landing page
	4.	City-specific ad landing page
	5.	Comparison-led landing page

Each should reduce distractions and focus on:
	•	headline
	•	value proposition
	•	product or category highlights
	•	CTA
	•	trust
	•	WhatsApp button
	•	short lead form

⸻

11. UX Recommendation on Login vs OTP

Best recommendation

For phase 1:
	•	no login
	•	no password system
	•	no forced account creation
	•	optional OTP only at final order or lead submission if truly needed

This reduces friction and is ideal for WhatsApp-led ordering.

Why this is better
	•	faster launch
	•	lower complexity
	•	less drop-off
	•	easier for villages and retailer leads
	•	easier ad testing
	•	aligned with manual confirmation flow

⸻

12. Suggested Visual Style Direction

Brand feel
	•	practical
	•	trustworthy
	•	local yet modern
	•	commerce-focused
	•	utility-first, not luxury-first

Visual direction
	•	clean ecommerce grids
	•	bold CTAs
	•	earthy + technical tone
	•	product-first imagery
	•	clear tags for use case
	•	large WhatsApp CTA treatment

Possible color directions:
	•	deep green + warm orange
	•	dark blue + solar yellow
	•	earthy charcoal + energy green

⸻

13. Mobile-First Priorities

Because many buyers will come from ads and WhatsApp, mobile design is critical.

Must-have mobile features:
	•	sticky WhatsApp button
	•	sticky cart / enquiry bar
	•	very fast category discovery
	•	compact filter drawer
	•	simple forms
	•	one-tap call
	•	share product via WhatsApp

⸻

14. Recommended MVP Scope

Phase 1 UI-only MVP

Build these first:
	•	Home page
	•	Category pages
	•	Product pages
	•	Cart page
	•	Checkout enquiry page
	•	Bulk order page
	•	About
	•	Contact
	•	5 local SEO pages
	•	8–12 article pages
	•	blog listing page
	•	comparison hub
	•	policy pages

Phase 2 light functionality
	•	form submissions
	•	WhatsApp prefill automation
	•	lead tracking
	•	featured product CMS control

Phase 3 ecommerce backend
	•	inventory
	•	order status
	•	OTP verification
	•	payments
	•	customer dashboard
	•	retailer account area

⸻

15. Final Product Recommendation for the Website Build

The website should be designed as a modular ecommerce + lead-generation platform with:
	•	product catalog depth
	•	SEO content depth
	•	ad landing flexibility
	•	WhatsApp-first ordering
	•	retailer / dealer bulk workflows
	•	city-first expansion architecture

The build should not be treated as a simple online store. It should behave like a hybrid of:
	•	ecommerce catalog
	•	local lead-gen site
	•	B2B enquiry platform
	•	content SEO authority site
	•	WhatsApp-assisted sales engine

⸻

16. Optional Pages for Later
	•	Compare products page with multi-product selection
	•	Saved quote page
	•	Dealer login dashboard
	•	Service request page
	•	Installation booking page
	•	Video guides hub
	•	Download brochure page
	•	Franchise / district distributor page

⸻

17. Recommended Initial Routes List
	•	/
	•	/about
	•	/contact
	•	/bulk-orders
	•	/guides
	•	/comparisons
	•	/faq
	•	/privacy-policy
	•	/returns-policy
	•	/shipping-policy

Categories:
	•	/category/alternative-cooking
	•	/category/solar-power-backup
	•	/category/village-hybrid-kitchen
	•	/category/commercial-stall-solutions
	•	/category/retailer-bulk-orders

Local pages:
	•	/delhi/backup-kitchen-products
	•	/delhi/solar-backup-for-homes
	•	/rewa/village-hybrid-kitchen
	•	/bhopal/retailer-bulk-kitchen-products
	•	/jabalpur/solar-and-backup-products

Guide pages:
	•	/guides/induction-vs-lpg-for-delhi-homes
	•	/guides/solar-vs-inverter-for-small-shops
	•	/guides/smokeless-stove-vs-traditional-chulha
	•	/guides/best-backup-kitchen-products-for-pg-hostels
	•	/guides/how-retailers-can-sell-energy-resilience-products-in-mp

⸻

18. Final Decision Summary

Should you build it this way?

Yes.

Should you start with WhatsApp ordering?

Yes.

Should you require login?

No.

Should you support cart, bulk orders, categories, product pages, local SEO, blog pages, and comparison content from day one at the UI level?

Yes.

Should the architecture anticipate backend later?

Absolutely.

This is the right approach for validating products and categories through ads first, while preserving the ability to become a full ecommerce business later.
