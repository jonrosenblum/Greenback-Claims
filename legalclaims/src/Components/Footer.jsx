export default function Footer() {
    return (
      <div className="text-center text-white bg-bgg dark:bg-gray-900 w-full">
        <div className="p-16 text-sm">
          <p>
            This is an ADVERTISEMENT placed by Kopelowitz Ostrow P.A. at 1 West Las Olas Blvd. 5th Floor, Ft. Lauderdale, FL 33301 and GMK Law Ltd at 227 W. Monroe. Street, Suite 2100, Chicago, IL 60606. Kopelowitz Ostrow P.A. lawyers are licensed in Florida. GMK Law Ltd lawyers are licensed in Illinois. Cases may be referred to other lawyers, with these law firms as co-counsel sharing joint responsibility. Information presented here should not be construed to be formal legal advice, nor is it providing information for the formation of an attorney-client relationship. The choice of a lawyer is an important decision that should not be based solely upon advertisements. Free background information available on request. No representation is made that the quality of the legal services to be performed is greater than the quality of legal services performed by others. This advertisement is not intended as a testimonial or endorsement, and does not constitute a guarantee, warranty, or prediction regarding the outcome of your legal matter, either express or implied. Non-attorney spokesperson represented in advertising. Anyone considering a lawyer should independently investigate the lawyers’ credentials and ability, and not rely upon advertisements or self-proclaimed expertise.
          </p>
          <p className="mt-6">This website uses tracking technology and allows third parties, including Meta, to use cookies, web beacons, and other storage technologies to collect or receive information from your interactions on this website and elsewhere on the Internet. Third parties, including Meta, may use that information to provide measurement services to businesses and in advertising, including targeting and delivering ads. Learn more information on what data is being collected and how to opt out of data collection here: https://optout.aboutads.info/?c=2&lang=EN</p>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="py-6">
          <p>© {new Date().getFullYear()} - KO Lawyers and GMK Law. All rights reserved</p>
        </div>
      </div>
    );
  }