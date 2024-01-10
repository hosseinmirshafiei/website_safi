
import ValueItem from "./ValueItem";

export default function Values({ values , property }) {
  return (
    <div className="values_parent">
      {values &&
        values.map((item) => (
          <div key={item.id}>
            <ValueItem item={item} property={property} />
          </div>
        ))}
    </div>
  );
}
