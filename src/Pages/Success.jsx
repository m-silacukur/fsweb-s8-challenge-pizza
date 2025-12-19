import "./Success.css";
import logo from "../../images/iteration-1-images/logo.svg";

function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return d.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Success({ orderResponse }) {
  const id = orderResponse?.id ?? "-";
  const createdAt = formatDate(orderResponse?.createdAt);
  const fullName = orderResponse?.fullName ?? "-";
  const pizza = orderResponse?.pizza ?? "-";
  const size = orderResponse?.size ?? "-";
  const dough = orderResponse?.dough ?? "-";
  const toppings = orderResponse?.toppings?.length ? orderResponse.toppings.join(", ") : "-";
  const note = orderResponse?.note?.trim() ? orderResponse.note : "-";

  return (
    <div className="success-page">
      <header className="success-header">
        <img className="success-logo" src={logo} alt="Teknolojik Yemekler" />
      </header>

      <main className="success-main">
        <h1 className="success-title" data-cy="success-title">
          TEBRİKLER!
          <br />
          SİPARİŞİNİZ ALINDI!
        </h1>

        <section className="success-summary" data-cy="success-summary">
          <div className="success-card">
            <h2 className="card-title">Sipariş Özeti:</h2>

            <p className="card-row"><strong>Durum:</strong> Siparişiniz alındı.</p>
            <p className="card-row"><strong>Sipariş No:</strong> {id}</p>
            <p className="card-row"><strong>Tarih:</strong> {createdAt}</p>
            <p className="card-row"><strong>İsim Soyisim:</strong> {fullName}</p>
          </div>

          <div className="success-card">
            <h2 className="card-title">Sipariş Detayları:</h2>

            <p className="card-row"><strong>Ürün:</strong> {pizza}</p>
            <p className="card-row"><strong>Boyut / Hamur:</strong> {size} / {dough}</p>
            <p className="card-row"><strong>Ekstra Malzemeler:</strong> {toppings}</p>
            <p className="card-row"><strong>Sipariş Notu:</strong> {note}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
