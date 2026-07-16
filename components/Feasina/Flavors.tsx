import { getStorefrontCatalog } from "@/lib/data/catalog";
import { getFlavourTheme } from "@/lib/flavor-theme";
import { FlavorCard } from "./FlavorCard";

export default async function Flavors() {
  const catalog = await getStorefrontCatalog();
  const bestsellers = catalog.filter((f) => f.isBestseller);
  const others = catalog.filter((f) => !f.isBestseller);

  return (
    <section id="flavours" className="py-16 bg-linear-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Our Irresistible Flavors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From tropical paradise to refreshing citrus bursts, each flavor is
            crafted to transport you to summer bliss with every sip
          </p>
        </div>

        {/* Bestsellers */}
        {bestsellers.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              🌟 Customer Favorites
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {bestsellers.map((flavour) => (
                <div key={flavour.id} className="w-full sm:w-80">
                  <FlavorCard flavour={flavour} theme={getFlavourTheme(flavour.slug)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Flavors */}
        {others.length > 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800">
              More Exciting Options
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {others.map((flavour) => (
                <div key={flavour.id} className="w-full sm:w-72">
                  <FlavorCard flavour={flavour} theme={getFlavourTheme(flavour.slug)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
