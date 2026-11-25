import { useMemo, useState } from "react";
import "./Profile.css";

const initialProfiles = [
  {
    id: "alex",
    name: "Alex Morgan",
    handle: "@alexmorgan",
    location: "Quezon City, Philippines",
    bio: "Finding good things a second home. I sell well-loved pieces and take great care of every order.",
    avatar:
      "https:",
    joined: "March 2023",
    own: true,
    items: [
      {
        id: "item-1",
        title: "Canvas everyday tote",
        category: "Accessories",
        condition: "Like new",
        price: 450,
        image:
          "https:",
      },
      {
        id: "item-2",
        title: "Classic film camera",
        category: "Electronics",
        condition: "Good",
        price: 1850,
        image:
          "https:",
      },
      {
        id: "item-3",
        title: "Ceramic coffee set",
        category: "Home",
        condition: "Like new",
        price: 680,
        image:
          "https:",
      },
    ],
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    handle: "@jordanfinds",
    location: "Makati City, Philippines",
    bio: "Curating vintage staples, little home upgrades, and pieces with a story.",
    avatar:
      "https:",
    joined: "August 2022",
    own: false,
    items: [
      {
        id: "item-4",
        title: "Vintage denim jacket",
        category: "Clothing",
        condition: "Good",
        price: 1200,
        image:
          "https:",
      },
      {
        id: "item-5",
        title: "Minimal desk lamp",
        category: "Home",
        condition: "Like new",
        price: 950,
        image:
          "https:",
      },
    ],
  },
];

const initialReviews = {
  alex: [
    { id: "review-1", name: "Mia Santos", date: "2 weeks ago", rating: 5, text: "Item was exactly as described and packed with care. Would buy again!" },
    { id: "review-2", name: "Chris Dela Cruz", date: "1 month ago", rating: 5, text: "Quick replies and a super smooth transaction. Thank you!" },
    { id: "review-3", name: "Pat Reyes", date: "2 months ago", rating: 4, text: "Lovely item and friendly seller. Shipping took a little longer than expected." },
  ],
  jordan: [
    { id: "review-4", name: "Anne Rose", date: "1 week ago", rating: 5, text: "Such a great find! Jordan was helpful and shipped it right away." },
    { id: "review-5", name: "Steven Barsss", date: "3 weeks ago", rating: 5, text: "Beautiful quality and thoughtful packaging. Highly recommend." },
    { id: "review-6", name: "jade Taallake", date: "1 month ago", rating: 4, text: "Friendly communication and everything arrived safely." },
  ],
};

function Stars({ value, interactive = false, onChange, label = "rating" }) {
  return (
    <span className={`profile-stars${interactive ? " is-interactive" : ""}`} role={interactive ? "group" : "img"} aria-label={`${value} out of 5 ${label}`}>
      {[1, 2, 3, 4, 5].map((star) =>
        interactive ? (
          <button
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            aria-pressed={value === star}
            className={star <= value ? "star is-filled" : "star"}
            key={star}
            onClick={() => onChange(star)}
            type="button"
          >
            ★
          </button>
        ) : (
          <span className={star <= Math.round(value) ? "star is-filled" : "star"} key={star}>★</span>
        ),
      )}
    </span>
  );
}

function Avatar({ profile, size = "large" }) {
  return (
    <div className={`profile-avatar profile-avatar--${size}`}>
      {profile.avatar ? <img src={profile.avatar} alt={`${profile.name}`} /> : <span>{profile.name.split(" ").map((part) => part[0]).join("")}</span>}
    </div>
  );
}

export default function Profile() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [activeId, setActiveId] = useState("alex");
  const [reviews, setReviews] = useState(initialReviews);
  const [editing, setEditing] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [itemForm, setItemForm] = useState({ title: "", category: "Clothing", condition: "Like new", price: "", image: "" });
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");

  const activeProfile = profiles.find((profile) => profile.id === activeId);
  const profileReviews = reviews[activeId] ?? [];
  const averageRating = useMemo(
    () => profileReviews.length ? profileReviews.reduce((sum, review) => sum + review.rating, 0) / profileReviews.length : 0,
    [profileReviews],
  );

  function readPhoto(file, onRead) {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file to continue.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Please choose an image smaller than 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onRead(reader.result);
      else setError("That image could not be loaded. Please try another one.");
    };
    reader.onerror = () => setError("That image could not be loaded. Please try another one.");
    reader.readAsDataURL(file);
  }

  function openEditor() {
    setError("");
    setEditForm({ name: activeProfile.name, location: activeProfile.location, bio: activeProfile.bio, avatar: activeProfile.avatar });
    setEditing(true);
  }

  function saveProfile(event) {
    event.preventDefault();
    setProfiles((current) => current.map((profile) => profile.id === activeId ? { ...profile, ...editForm } : profile));
    setEditing(false);
  }

  function addItem(event) {
    event.preventDefault();
    setError("");
    if (!itemForm.image) {
      setError("Add a photo of your item before posting.");
      return;
    }
    setProfiles((current) => current.map((profile) => profile.id === activeId
      ? { ...profile, items: [{ ...itemForm, id: `item-${Date.now()}`, price: Number(itemForm.price) }, ...profile.items] }
      : profile));
    setItemForm({ title: "", category: "Clothing", condition: "Like new", price: "", image: "" });
    setAddingItem(false);
  }

  function submitReview(event) {
    event.preventDefault();
    if (!rating || !reviewText.trim()) return;
    const review = {
      id: `review-${Date.now()}`,
      name: "You",
      date: "Just now",
      rating,
      text: reviewText.trim(),
    };
    setReviews((current) => ({ ...current, [activeId]: [review, ...(current[activeId] ?? [])] }));
    setRating(0);
    setReviewText("");
  }

  return (
    <main className="profile-app">
      <header className="profile-topbar">
        <a className="profile-brand" href="#profile" aria-label="Goodfind home">
          <span className="brand-mark">g</span>
          <span>goodfind</span>
        </a>
        <div className="profile-topbar-right">
          <span className="topbar-note">A little more life for good things.</span>
          <button className="topbar-avatar" type="button" onClick={() => setActiveId("alex")} aria-label="Go to your profile">
            <Avatar profile={profiles[0]} size="small" />
          </button>
        </div>
      </header>

      <nav className="profile-switcher" aria-label="Choose a profile to view">
        <span className="switcher-label">VIEW PROFILE</span>
        {profiles.map((profile) => (
          <button className={`switcher-option${activeId === profile.id ? " is-current" : ""}`} key={profile.id} onClick={() => { setActiveId(profile.id); setError(""); }} type="button">
            <Avatar profile={profile} size="tiny" />
            {profile.own ? "Your profile" : profile.name}
          </button>
        ))}
      </nav>

      <section className="profile-hero" id="profile">
        <div className="hero-glow" aria-hidden="true" />
        <div className="profile-hero-inner">
          <div className="hero-avatar-wrap">
            <Avatar profile={activeProfile} />
            <span className="verified-badge" title="Goodfind member">✓</span>
          </div>
          <div className="hero-copy">
            <div className="hero-eyebrow">{activeProfile.own ? "YOUR LITTLE CORNER" : "MEET THE SELLER"}</div>
            <h1>{activeProfile.name}</h1>
            <p className="profile-handle">{activeProfile.handle}</p>
            <p className="profile-bio">{activeProfile.bio}</p>
            <div className="profile-meta">
              <span><span className="meta-icon">⌖</span>{activeProfile.location}</span>
              <span><span className="meta-icon">✦</span>Member since {activeProfile.joined}</span>
            </div>
            <div className="hero-actions">
              {activeProfile.own ? (
                <>
                  <button className="button button-primary" onClick={openEditor} type="button"><span>✎</span> Edit profile</button>
                  <button className="button button-secondary" onClick={() => { setItemForm({ title: "", category: "Clothing", condition: "Like new", price: "", image: "" }); setAddingItem(true); setError(""); }} type="button"><span>＋</span> Add an item</button>
                </>
              ) : (
                <button className="button button-primary" onClick={() => document.getElementById("write-review")?.scrollIntoView({ behavior: "smooth" })} type="button">Leave a review <span>↗</span></button>
              )}
            </div>
          </div>
          <div className="rating-card">
            <div className="rating-card-label">COMMUNITY RATING</div>
            <div className="rating-score">{averageRating ? averageRating.toFixed(1) : "—"}<span>/ 5</span></div>
            <Stars value={averageRating} />
            <div className="rating-count">{profileReviews.length} thoughtful review{profileReviews.length === 1 ? "" : "s"}</div>
            <div className="rating-divider" />
            <div className="rating-stat"><span className="stat-dot" />Friendly & reliable</div>
          </div>
        </div>
      </section>

      <div className="profile-content">
        <section className="items-section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">GOOD THINGS, AGAIN</p>
              <h2>{activeProfile.own ? "Your items" : `${activeProfile.name.split(" ")[0]}'s items`} <span className="item-count">{activeProfile.items.length}</span></h2>
            </div>
            {activeProfile.own && <button className="text-button" type="button" onClick={() => setAddingItem(true)}>＋ Post an item</button>}
          </div>
          {activeProfile.items.length ? (
            <div className="item-grid">
              {activeProfile.items.map((item) => (
                <article className="item-card" key={item.id}>
                  <div className="item-photo"><img src={item.image} alt={item.title} /><span className="item-condition">{item.condition}</span></div>
                  <div className="item-details">
                    <span className="item-category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <div className="item-bottom"><span className="item-price">₱{Number(item.price).toLocaleString("en-PH")}</span><span className="item-arrow" aria-hidden="true">↗</span></div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-items"><span>✳</span><h3>No items posted yet</h3><p>When there’s something to share, it’ll show up here.</p></div>
          )}
        </section>

        <section className="reviews-section">
          <div className="section-heading reviews-heading">
            <div>
              <p className="section-kicker">KIND WORDS FROM THE COMMUNITY</p>
              <h2>Reviews <span className="item-count">{profileReviews.length}</span></h2>
            </div>
            <div className="reviews-summary"><Stars value={averageRating} /><strong>{averageRating ? averageRating.toFixed(1) : "New"}</strong><span>average</span></div>
          </div>

          {!activeProfile.own && (
            <form className="review-form" id="write-review" onSubmit={submitReview}>
              <div className="review-form-title"><span className="review-form-icon">✦</span><div><strong>Have you bought from {activeProfile.name.split(" ")[0]}?</strong><p>Share a kind, honest review to help the community.</p></div></div>
              <label className="rating-prompt">Your rating <Stars value={rating} interactive onChange={setRating} label="your rating" /></label>
              <textarea aria-label="Write your review" onChange={(event) => setReviewText(event.target.value)} placeholder="How did it go? What should other buyers know?" required rows="3" value={reviewText} />
              <div className="review-submit-row"><span>Keep it thoughtful and helpful.</span><button className="button button-primary" disabled={!rating || !reviewText.trim()} type="submit">Post review <span>↗</span></button></div>
            </form>
          )}

          <div className="review-list">
            {profileReviews.map((review) => (
              <article className="review-card" key={review.id}>
                <div className="reviewer-avatar">{review.name === "You" ? "Y" : review.name.split(" ").map((part) => part[0]).join("")}</div>
                <div className="review-body">
                  <div className="review-header"><div><strong>{review.name}</strong><span className="review-date">{review.date}</span></div><Stars value={review.rating} /></div>
                  <p>{review.text}</p>
                </div>
              </article>
            ))}
            {!profileReviews.length && <div className="empty-reviews">No reviews yet. Be the first to share a kind word.</div>}
          </div>
        </section>
      </div>

      <footer className="profile-footer"><span className="footer-mark">g</span><span>Goodfind is better when good things go around.</span><span>Made for second chances ✦</span></footer>

      {(editing || addingItem) && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) { setEditing(false); setAddingItem(false); setError(""); } }}>
          <section aria-labelledby="modal-title" aria-modal="true" className="profile-modal" role="dialog">
            <button aria-label="Close dialog" className="modal-close" onClick={() => { setEditing(false); setAddingItem(false); setError(""); }} type="button">×</button>
            <p className="section-kicker">{editing ? "MAKE IT YOURS" : "PASS IT ON"}</p>
            <h2 id="modal-title">{editing ? "Edit your profile" : "Post a good find"}</h2>
            <p className="modal-intro">{editing ? "A little about you helps good things find the right home." : "Add a few details so your item finds its next favorite person."}</p>
            <form onSubmit={editing ? saveProfile : addItem}>
              {editing ? (
                <>
                  <label className="photo-upload avatar-upload">
                    {editForm.avatar ? <img src={editForm.avatar} alt="Profile preview" /> : <span>＋</span>}
                    <span>Change photo</span>
                    <input accept="image/*" onChange={(event) => readPhoto(event.target.files?.[0], (avatar) => setEditForm((current) => ({ ...current, avatar })))} type="file" />
                  </label>
                  <label className="field-label">Name<input maxLength="50" onChange={(event) => setEditForm({ ...editForm, name: event.target.value })} required value={editForm.name} /></label>
                  <label className="field-label">Location<input maxLength="80" onChange={(event) => setEditForm({ ...editForm, location: event.target.value })} required value={editForm.location} /></label>
                  <label className="field-label">A little about you<textarea maxLength="220" onChange={(event) => setEditForm({ ...editForm, bio: event.target.value })} required rows="3" value={editForm.bio} /></label>
                </>
              ) : (
                <>
                  <label className="photo-upload item-upload">
                    {itemForm.image ? <img src={itemForm.image} alt="Item preview" /> : <><span className="upload-symbol">↑</span><strong>Add an item photo</strong><small>JPG, PNG or WEBP · up to 5 MB</small></>}
                    <input accept="image/*" onChange={(event) => readPhoto(event.target.files?.[0], (image) => setItemForm((current) => ({ ...current, image })))} type="file" />
                  </label>
                  <label className="field-label">Item name<input maxLength="70" onChange={(event) => setItemForm({ ...itemForm, title: event.target.value })} placeholder="e.g. Everyday canvas tote" required value={itemForm.title} /></label>
                  <div className="field-row">
                    <label className="field-label">Price (₱)<input min="1" onChange={(event) => setItemForm({ ...itemForm, price: event.target.value })} placeholder="450" required type="number" value={itemForm.price} /></label>
                    <label className="field-label">Category<select onChange={(event) => setItemForm({ ...itemForm, category: event.target.value })} value={itemForm.category}><option>Clothing</option><option>Accessories</option><option>Electronics</option><option>Home</option><option>Books</option><option>Other</option></select></label>
                  </div>
                  <label className="field-label">Condition<select onChange={(event) => setItemForm({ ...itemForm, condition: event.target.value })} value={itemForm.condition}><option>Like new</option><option>Good</option><option>Well-loved</option></select></label>
                </>
              )}
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button button-primary modal-submit" type="submit">{editing ? "Save changes" : "Post item"} <span>↗</span></button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
