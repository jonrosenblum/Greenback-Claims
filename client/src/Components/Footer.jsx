export default function Footer() {
    return (
      <div className="text-center text-white bg-bgg dark:bg-gray-900 w-full">
        <div className="p-16 text-sm">
        <p>This advertisement is sponsored by Stabile Law Firm at 97 Main Street, Suite 208, Woodbridge Township, NJ 07095 and Criden & Love, P.A. at 7301 SW 57th Court, Suite 515, South Miami, FL 33143. Lawyers at Stabile Law Firm are licensed in New Jersey, New York, Pennsylvania, and Washington, D.C., while those at Criden & Love, P.A. are licensed in Florida. In certain cases, referrals may be directed to other lawyers, with these firms collaborating as co-counsel and sharing joint responsibility. The information presented here does not constitute formal legal advice, nor does it establish an attorney-client relationship. It&apos;s important to note that selecting a lawyer is a significant decision and should not be based solely on advertisements. Upon request, free background information is available. No claim is made that the quality of legal services offered is superior to that of others. Additionally, this advertisement is not intended as a testimonial or endorsement, nor does it guarantee, warrant, or predict the outcome of any legal matter, whether express or implied. It&apos;s essential for individuals considering legal representation to conduct independent investigations into the credentials and capabilities of the lawyers, rather than relying solely on advertisements or self-proclaimed expertise. Please be aware that non-attorney spokespersons are featured in this advertising.</p>

        </div>
        <hr className="border-t border-gray-300" />
        <div className="py-6">
          <p>© {new Date().getFullYear()} - Greenback Claims. All rights reserved</p>
        </div>
      </div>
    );
  }