import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./OrderForm.css";
import logo from "../../images/iteration-1-images/logo.svg";

const BASE_PRICE = 85.5;
const TOPPING_PRICE = 5;

const TOPPINGS = [
  "Pepperoni",
  "Tavuk Izgara",
  "Mısır",
  "Sarımsak",
  "Ananas",
  "Sosis",
  "Soğan",
  "Sucuk",
  "Biber",
  "Kabak",
  "Kanada Jambonu",
  "Domates",
  "Jalepeno",
  "İstiridye Mantarı",
];

export default function OrderForm({ setOrderResponse }) {
  const history = useHistory();

  const [fullName, setFullName] = useState("");
  const [size, setSize] = useState("");
  const [dough, setDough] = useState("");
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);
  const [toppings, setToppings] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toppingsTotal = useMemo(
    () => toppings.length * TOPPING_PRICE,
    [toppings]
  );
  const total = useMemo(
    () => (BASE_PRICE + toppingsTotal) * qty,
    [toppingsTotal, qty]
  );

  
  const nameOk = useMemo(() => fullName.trim().length >= 3, [fullName]);
  const toppingsOk = useMemo(
    () => toppings.length >= 4 && toppings.length <= 10,
    [toppings]
  );

  const isValid = useMemo(() => {
    const hasSize = size.trim().length > 0;
    const hasDough = dough.trim().length > 0;
    const qtyOk = qty >= 1;
    return nameOk && hasSize && hasDough && toppingsOk && qtyOk;
  }, [nameOk, size, dough, toppingsOk, qty]);

  function toggleTopping(value, checked) {
    if (checked) {
      if (toppings.length >= 10) return; 
      setToppings((prev) => [...prev, value]);
    } else {
      setToppings((prev) => prev.filter((t) => t !== value));
    }
  }

  function decQty() {
    setQty((q) => Math.max(1, q - 1));
  }
  function incQty() {
    setQty((q) => q + 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setErrorMsg("");
    setIsSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      pizza: "Position Absolute Acı Pizza",
      size,
      dough,
      toppings,
      note,
      quantity: qty,
      selectionsTotal: Number((toppingsTotal * qty).toFixed(2)),
      total: Number(total.toFixed(2)),
    };

    try {
      const res = await axios.post("https://reqres.in/api/pizza", payload, {
        headers: { "x-api-key": "reqres-free-v1" },
      });

      console.log("Sipariş özeti (API response):", res.data);

      setOrderResponse(res.data);
      history.push("/onay");
    } catch (err) {
      console.warn(err);
      setErrorMsg("Sipariş gönderilemedi. Lütfen tekrar deneyiniz.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="order-page" data-cy="order-page">
      <header className="order-header">
        <img className="order-logo" src={logo} alt="Teknolojik Yemekler" />
        <p className="order-breadcrumb">
          <span>Anasayfa</span> - <strong>Sipariş Oluştur</strong>
        </p>
      </header>

      <main className="order-content">
        <section className="pizza-info">
          <h2 className="pizza-title">Position Absolute Acı Pizza</h2>

          <div className="price-row">
            <p className="pizza-price">85.50₺</p>
            <div className="pizza-meta">
              <span className="meta-item">4.9</span>
              <span className="meta-item">(200)</span>
            </div>
          </div>

          <p className="pizza-desc">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
            düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
            lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
          </p>
        </section>

        <form className="order-form" onSubmit={handleSubmit} data-cy="order-form">
          <div className="form-two-col">
            <fieldset className="size-field" aria-label="Boyut seçimi">
              <legend className="field-label">
                Boyut Seç <span className="req">*</span>
              </legend>

              <label className="radio">
                <input
                  type="radio"
                  name="size"
                  value="Küçük"
                  required
                  disabled={isSubmitting}
                  checked={size === "Küçük"}
                  onChange={(e) => setSize(e.target.value)}
                  data-cy="size-kucuk"
                />
                Küçük
              </label>

              <label className="radio">
                <input
                  type="radio"
                  name="size"
                  value="Orta"
                  disabled={isSubmitting}
                  checked={size === "Orta"}
                  onChange={(e) => setSize(e.target.value)}
                  data-cy="size-orta"
                />
                Orta
              </label>

              <label className="radio">
                <input
                  type="radio"
                  name="size"
                  value="Büyük"
                  disabled={isSubmitting}
                  checked={size === "Büyük"}
                  onChange={(e) => setSize(e.target.value)}
                  data-cy="size-buyuk"
                />
                Büyük
              </label>
            </fieldset>

            <div className="field">
              <label className="field-label" htmlFor="dough">
                Hamur Seç <span className="req">*</span>
              </label>

              <select
                id="dough"
                className="select"
                required
                disabled={isSubmitting}
                value={dough}
                onChange={(e) => setDough(e.target.value)}
                data-cy="dough-select"
              >
                <option value="" disabled>
                  Hamur Kalınlığı
                </option>
                <option value="ince">İnce</option>
                <option value="orta">Orta</option>
                <option value="kalin">Kalın</option>
              </select>
            </div>
          </div>

          
          <section className="extras">
            <h3 className="section-title">Ek Malzemeler</h3>
            <p className="section-sub">
              En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺
            </p>

            {toppings.length < 4 && (
             <p className="form-hint" role="alert">
               En az 4 malzeme seçmelisin.
              </p>
           )}  

            

            <div className="toppings-grid">
             {TOPPINGS.map((t, idx) => {
              const checked = toppings.includes(t);
              const disabled = (!checked && toppings.length >= 10) || isSubmitting;

             return (
             <label key={t} className="checkbox">
             <input
              type="checkbox"
              name="toppings"
              value={t}
              checked={checked}
              disabled={disabled}
              onChange={(e) => toggleTopping(t, e.target.checked)}
              data-cy={`topping-${idx}`}
              />
              <span>{t}</span>
              </label>
        );
            })}
            </div>
          </section>

          <section className="field">
            <label className="field-label" htmlFor="fullName">
              İsim Soyisim <span className="req">*</span>
            </label>

            <input
              id="fullName"
              className="text-input"
              type="text"
              placeholder="En az 3 karakter girmelisin."
              minLength={3}
              required
              disabled={isSubmitting}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              data-cy="name-input"
            />

            {!nameOk && fullName.length > 0 && (
              <p className="form-hint" role="alert">
                İsim Soyisim en az 3 karakter olmalı.
              </p>
            )}
          </section>

          
          <section className="note">
            <label className="field-label" htmlFor="note">
              Sipariş Notu
            </label>

            <textarea
              id="note"
              className="textarea"
              rows={3}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              disabled={isSubmitting}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <hr className="divider" />
          </section>

          <section className="bottom-row">
            <div className="mobile-actions">
              <div className="qty" aria-label="Adet seçimi">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={decQty}
                  disabled={isSubmitting}
                >
                  -
                </button>
                <div className="qty-value">{qty}</div>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={incQty}
                  disabled={isSubmitting}
                >
                  +
                </button>
              </div>

              <button
                className="submit submit--mobile"
                type="submit"
                data-cy="submit-order-mobile"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "GÖNDERİLİYOR..." : "SİPARİŞ VER"}
              </button>
            </div>

            <aside className="summary" aria-label="Sipariş özeti">
              <h4 className="summary-title">Sipariş Toplamı</h4>

              <div className="summary-line">
                <span>Seçimler</span>
                <span>{(toppingsTotal * qty).toFixed(2)}₺</span>
              </div>

              <div className="summary-line total">
                <span>Toplam</span>
                <span>{total.toFixed(2)}₺</span>
              </div>

              <button
                className="submit submit--desktop"
                type="submit"
                data-cy="submit-order"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "GÖNDERİLİYOR..." : "SİPARİŞ VER"}
              </button>

              {errorMsg && (
                <p className="form-hint" role="alert" style={{ margin: 0 }}>
                  {errorMsg}
                </p>
              )}
            </aside>
          </section>
        </form>
      </main>
    </div>
  );
}
