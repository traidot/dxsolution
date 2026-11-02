import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import CTA from "@/components/CTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const titles = {
    vi: "Chính sách bảo mật & Pháp lý - DXS",
    en: "Privacy & Compliance Policy - DXS",
    ja: "プライバシーポリシー & 法令遵守 - DXS",
  };

  const descriptions = {
    vi: "Cam kết bảo mật thông tin, thỏa thuận NDA, tuân thủ Nghị định 13/2023/NĐ-CP và tiêu chuẩn an toàn dữ liệu doanh nghiệp tại DXS.",
    en: "Information security commitments, NDA agreements, Decree 13/2023/ND-CP compliance, and enterprise data protection standards at DXS.",
    ja: "DXSの情報セキュリティ方針、NDA（秘密保持契約）、個人情報保護方針および企業データ保護基準についてご説明します。",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!hasLocale(rawLang)) notFound();
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  const content = {
    vi: {
      home: "Trang chủ",
      eyebrow: "CHÍNH SÁCH BẢO MẬT & PHÁP LÝ",
      bannerTitle: "Cam kết bảo mật dữ liệu, an toàn thông tin & minh bạch pháp lý",
      bannerSub: "DXS tuân thủ nghiêm ngặt các quy chuẩn kỹ thuật an toàn thông tin quốc tế và quy định pháp luật Việt Nam (Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân).",
      lastUpdated: "Cập nhật lần cuối: Tháng 03/2025 • Áp dụng cho toàn bộ dự án và khách hàng của DXS",

      navTitle: "Mục lục chính sách",
      sections: [
        {
          id: "nda",
          num: "01",
          title: "Thỏa thuận bảo mật thông tin (NDA)",
          summary: "Ký kết thỏa thuận NDA trước khi tiếp cận bất kỳ tài liệu hay dữ liệu nghiệp vụ nào.",
          content: [
            "DXS chủ động ký kết Thỏa thuận bảo mật thông tin (Non-Disclosure Agreement - NDA) có giá trị pháp lý ràng buộc song phương với khách hàng trước khi tiến hành khảo sát nghiệp vụ hoặc tiếp cận dữ liệu hiện hữu.",
            "Tất cả thông tin tài chính, quy trình vận hành nội bộ, danh sách khách hàng, cấu trúc chi phí và bí mật kinh doanh của khách hàng được phân loại ở cấp độ tuyệt mật.",
            "Đội ngũ kỹ sư, chuyên gia tư vấn và quản lý dự án của DXS đều ký cam kết bảo mật nội bộ và chịu trách nhiệm pháp lý cá nhân về việc giữ kín thông tin dự án.",
          ],
        },
        {
          id: "data-collection",
          num: "02",
          title: "Phạm vi thu thập & Mục đích sử dụng dữ liệu",
          summary: "Chỉ thu thập dữ liệu phục vụ trực tiếp cho việc phát triển, kiểm thử và vận hành hệ thống.",
          content: [
            "DXS chỉ tiếp nhận và xử lý dữ liệu được khách hàng chủ động cung cấp nhằm mục đích: tư vấn kiến trúc, lập trình phát triển hệ thống, kiểm thử tính năng (UAT), tích hợp API và hỗ trợ kỹ thuật bảo trì.",
            "Trong quá trình kiểm thử phần mềm, DXS khuyến khích và hỗ trợ khách hàng thực hiện ẩn danh hóa (data anonymization/masking) đối với dữ liệu sản xuất thực tế.",
            "DXS tuyệt đối không bán, cho thuê, trao đổi hoặc chuyển giao dữ liệu của khách hàng cho bất kỳ bên thứ ba nào vì mục đích thương mại hoặc quảng cáo.",
          ],
        },
        {
          id: "technical-standards",
          num: "03",
          title: "Tiêu chuẩn an toàn thông tin & Mã hóa kỹ thuật",
          summary: "Áp dụng kiến trúc bảo mật nhiều lớp từ hạ tầng đám mây đến mã nguồn ứng dụng.",
          content: [
            "Mã hóa đường truyền & dữ liệu lưu trữ: Toàn bộ kết nối API và cổng thông tin được mã hóa bằng giao thức TLS 1.3. Cơ sở dữ liệu nhạy cảm được mã hóa ở trạng thái lưu trữ (Encryption at Rest) bằng thuật toán AES-256.",
            "Quản lý truy cập phân quyền (RBAC): Hệ thống được thiết kế theo nguyên tắc đặc quyền tối thiểu (Least Privilege). Mọi thao tác truy xuất, chỉnh sửa hoặc xóa dữ liệu đều được ghi nhận nhật ký kiểm toán (Audit Logs) bất biến.",
            "Kiểm thử bảo mật định kỳ: Quy trình phát triển phần mềm tuân thủ tiêu chuẩn OWASP Top 10, quét mã độc tự động (SAST/DAST) và kiểm thử thâm nhập (Penetration Testing) trước khi triển khai môi trường sản xuất (Production).",
          ],
        },
        {
          id: "intellectual-property",
          num: "04",
          title: "Quyền sở hữu trí tuệ & Bàn giao mã nguồn",
          summary: "Khách hàng nắm giữ toàn quyền sở hữu trí tuệ đối với phần mềm và dữ liệu của mình.",
          content: [
            "Toàn bộ mã nguồn (Source Code), tài liệu thiết kế kiến trúc, cơ sở dữ liệu và bản quyền phần mềm phát triển theo hợp đồng dịch vụ thuộc quyền sở hữu độc quyền của khách hàng sau khi hoàn tất nghiệm thu và thanh toán.",
            "DXS có nghĩa vụ bàn giao đầy đủ mã nguồn sạch, tài liệu hướng dẫn triển khai (Deployment Guide) và tài liệu đặc tả API theo đúng quy định hợp đồng.",
            "DXS không giữ lại 'cửa sau' (backdoor) hay cơ chế phụ thuộc kỹ thuật gây cản trở khách hàng tự quản trị hoặc chuyển giao đối tác khác trong tương lai.",
          ],
        },
        {
          id: "decree-13",
          num: "05",
          title: "Tuân thủ Nghị định 13/2023/NĐ-CP về dữ liệu cá nhân",
          summary: "Tôn trọng tuyệt đối quyền của chủ thể dữ liệu và tuân thủ khung pháp lý hiện hành.",
          content: [
            "DXS cam kết tuân thủ các nguyên tắc xử lý dữ liệu cá nhân theo Nghị định số 13/2023/NĐ-CP của Chính phủ Việt Nam đối với các hệ thống phần mềm xử lý thông tin người dùng cuối.",
            "Hệ thống do DXS thiết kế hỗ trợ khách hàng thực thi đầy đủ các quyền của chủ thể dữ liệu: quyền được biết, quyền đồng ý, quyền truy cập, quyền cải chính dữ liệu và quyền yêu cầu xóa/rút lại sự đồng ý.",
            "Thiết lập quy trình ứng phó sự cố an toàn thông tin: Thông báo cho khách hàng và cơ quan có thẩm quyền trong thời hạn luật định khi phát hiện nguy cơ rò rỉ hoặc vi phạm dữ liệu.",
          ],
        },
        {
          id: "liability",
          num: "06",
          title: "Trách nhiệm & Giới hạn nghĩa vụ",
          summary: "Quy định rõ ràng về nghĩa vụ vận hành và phạm vi trách nhiệm giữa hai bên.",
          content: [
            "DXS cam kết cung cấp dịch vụ với tiêu chuẩn chất lượng chuyên nghiệp cao nhất, tuân thủ đúng cam kết về mức độ dịch vụ (SLA) đã thỏa thuận trong hợp đồng.",
            "DXS không chịu trách nhiệm đối với các gián đoạn hoặc thất thoát dữ liệu phát sinh từ: sự cố bất khả kháng (thiên tai, chiến tranh), lỗi hạ tầng máy chủ của bên thứ ba do khách hàng tự chỉ định mà không qua khuyến nghị của DXS, hoặc do người dùng của khách hàng làm lộ thông tin tài khoản quản trị.",
          ],
        },
      ],

      contactTitle: "Liên hệ Ban Pháp chế & An toàn thông tin DXS",
      contactDesc: "Quý doanh nghiệp cần ký kết thỏa thuận NDA mẫu hoặc có bất kỳ câu hỏi nào liên quan đến chính sách an toàn thông tin, vui lòng liên hệ trực tiếp với chúng tôi:",
      legalDept: "Bộ phận Pháp chế & Tuân thủ Bảo mật DXS",
      legalEmail: "legal@dxs.vn",
      legalHotline: "0969 986 980",
      legalAddress: "Tòa nhà Keangnam Landmark 72, Phạm Hùng, Q. Nam Từ Liêm, Hà Nội",
      ctaBadge: "Cam kết đồng hành",
      ctaHeading: "Sẵn sàng khởi động dự án phần mềm với tiêu chuẩn bảo mật tuyệt đối",
      ctaSub: "Đội ngũ chuyên gia DXS sẵn sàng tư vấn giải pháp, ký thỏa thuận bảo mật NDA và lên phương án kỹ thuật phù hợp cho tổ chức của bạn.",
    },

    en: {
      home: "Home",
      eyebrow: "PRIVACY & COMPLIANCE",
      bannerTitle: "Commitment to Data Security, Information Safety & Legal Transparency",
      bannerSub: "DXS strictly complies with international cybersecurity engineering standards and Vietnamese laws (Decree No. 13/2023/ND-CP on personal data protection).",
      lastUpdated: "Last updated: March 2025 • Applicable to all DXS clients and enterprise projects",

      navTitle: "Policy Outline",
      sections: [
        {
          id: "nda",
          num: "01",
          title: "Non-Disclosure Agreement (NDA)",
          summary: "Legally binding mutual NDA signed prior to any business workflow or data access.",
          content: [
            "DXS proactively executes a mutual Non-Disclosure Agreement (NDA) with clients prior to conducting business discovery or accessing existing infrastructure.",
            "All customer financial records, internal operations, customer lists, pricing models, and trade secrets are strictly treated as highly confidential.",
            "All DXS engineers, consultants, and project managers execute strict internal confidentiality agreements and bear individual legal responsibility for safeguarding project assets.",
          ],
        },
        {
          id: "data-collection",
          num: "02",
          title: "Scope of Data Collection & Usage",
          summary: "Data is processed strictly for system development, testing, and operational maintenance.",
          content: [
            "DXS only accesses and processes data actively provided by the client for the explicit purposes of: architectural consulting, software engineering, UAT testing, API integration, and ongoing maintenance.",
            "During testing and QA cycles, DXS actively promotes and assists clients in applying automated data masking and anonymization to production datasets.",
            "DXS never sells, rents, distributes, or transfers customer proprietary data to any third party for commercial or advertising purposes.",
          ],
        },
        {
          id: "technical-standards",
          num: "03",
          title: "Technical Security Standards & Encryption",
          summary: "Multi-layered defense architecture spanning cloud infrastructure down to source code.",
          content: [
            "Encryption in Transit & at Rest: All network traffic and API interfaces are encrypted via TLS 1.3. Sensitive databases utilize AES-256 encryption at rest.",
            "Role-Based Access Control (RBAC): Systems follow the principle of least privilege. Every data retrieval, mutation, and deletion event is recorded in immutable audit logs.",
            "Automated Security Testing: Development workflows follow OWASP Top 10 guidelines, continuous SAST/DAST vulnerability scanning, and pre-production penetration testing.",
          ],
        },
        {
          id: "intellectual-property",
          num: "04",
          title: "Intellectual Property & Source Code Transfer",
          summary: "Clients retain 100% intellectual property ownership of all custom software and data.",
          content: [
            "All bespoke source code, architectural blueprints, database schemas, and intellectual property developed under the contract belong exclusively to the client upon final acceptance.",
            "DXS commits to delivering complete, well-documented source code, deployment scripts, and detailed API specifications.",
            "DXS does not insert proprietary lock-in mechanisms or backdoors, empowering clients to independently maintain or transition systems at any time.",
          ],
        },
        {
          id: "decree-13",
          num: "05",
          title: "Decree 13/2023/ND-CP Personal Data Protection",
          summary: "Full compliance with Vietnamese personal data protection regulations and individual rights.",
          content: [
            "DXS adheres to data protection principles under Government Decree 13/2023/ND-CP for all systems handling end-user personal data.",
            "DXS architectures empower enterprise clients to honor data subject rights: right to access, right to rectify, right to consent withdrawal, and right to be forgotten.",
            "Incident response protocols are established to immediately notify clients and regulatory authorities within statutory timelines in the event of any security vulnerability.",
          ],
        },
        {
          id: "liability",
          num: "06",
          title: "Liabilities & Limitations",
          summary: "Clear contractual boundaries defining operational responsibilities and service standards.",
          content: [
            "DXS delivers engineering services to the highest professional industry standards, adhering strictly to agreed Service Level Agreements (SLAs).",
            "DXS is not liable for service outages or data losses resulting from: force majeure events, unauthorized third-party infrastructure failures outside DXS control, or client credential compromise.",
          ],
        },
      ],

      contactTitle: "Contact DXS Legal & Security Office",
      contactDesc: "For standard mutual NDA templates or security audit inquiries, please contact our compliance team directly:",
      legalDept: "DXS Legal, Compliance & Information Security Office",
      legalEmail: "legal@dxs.vn",
      legalHotline: "0969 986 980",
      legalAddress: "Keangnam Landmark 72, Pham Hung Road, Nam Tu Liem, Hanoi, Vietnam",
      ctaBadge: "Enterprise Commitment",
      ctaHeading: "Ready to launch your enterprise software project with guaranteed security",
      ctaSub: "Our engineering consultants are ready to sign an NDA, audit your technical architecture, and propose a dependable development roadmap.",
    },

    ja: {
      home: "ホーム",
      eyebrow: "プライバシー & 法令遵守",
      bannerTitle: "データセキュリティ・情報保護およびコンプライアンスへの取り組み",
      bannerSub: "DXSは国際基準の情報セキュリティ規格およびベトナム法令（個人情報保護に関する政令13/2023/ND-CP号）を厳格に遵守します。",
      lastUpdated: "最終更新：2025年3月 • DXSの全プロジェクトおよびクライアントに適用",

      navTitle: "規約目次",
      sections: [
        {
          id: "nda",
          num: "01",
          title: "秘密保持契約（NDA）の締結",
          summary: "要件定義や既存データへのアクセス前に、法的拘束力を持つNDAを締結します。",
          content: [
            "DXSでは業務調査や既存システム調査の着手前に、お客様との間で双務的な秘密保持契約（NDA）を締結します。",
            "お客様の財務情報、業務プロセス、顧客データ、価格体系および企業秘密はすべて機密情報として厳格に管理されます。",
            "プロジェクトに携わるすべてのエンジニアおよびコンサルタントは社内守秘義務誓約書に署名し、個別の守秘責任を負います。",
          ],
        },
        {
          id: "data-collection",
          num: "02",
          title: "データ収集の範囲および利用目的",
          summary: "システムの開発・検証・運用保守の目的にのみ限定してデータを取り扱います。",
          content: [
            "DXSが取り扱うデータは、アーキテクチャ設計、システム開発、受入テスト（UAT）、API連携、保守運用の目的に限定されます。",
            "テストおよび検証工程においては、本番データのマスキング処理および匿名化の実施を推奨・支援します。",
            "お客様の機密データを第三者へ販売、賃貸、または広告目的で開示・提供することは一切ありません。",
          ],
        },
        {
          id: "technical-standards",
          num: "03",
          title: "技術的セキュリティ基準とデータ暗号化",
          summary: "クラウドインフラからソースコードレベルに至る多層防御アーキテクチャを採用。",
          content: [
            "通信および保存データの暗号化：すべての通信・API接続はTLS 1.3によって暗号化されます。機密データはAES-256による保存時暗号化（Encryption at Rest）を実施します。",
            "ロールベースアクセス制御（RBAC）：最小特権の原則を徹底し、すべてのデータ閲覧・更新・削除操作を改ざん不可能な監査ログ（Audit Logs）に記録します。",
            "セキュリティ脆弱性診断：OWASP Top 10に準拠した開発、自動コード静的解析（SAST/DAST）、本番稼働前のペネトレーションテストを実施します。",
          ],
        },
        {
          id: "intellectual-property",
          num: "04",
          title: "知的財産権およびソースコードの帰属",
          summary: "受託開発により制作された成果物の知的財産権はお客様に完全に帰属します。",
          content: [
            "受託開発契約に基づき開発されたソースコード、設計書、データベース定義等の知的財産権は、検収および支払完了時にお客様に完全に帰属します。",
            "DXSはクリーンなソースコード、デプロイマニュアル、API仕様書を含む納品物を完全に引き渡します。",
            "意図的なブラックボックス化やベンダーロックインを行わず、将来的な内製化や他社への引き継ぎが可能な設計を保証します。",
          ],
        },
        {
          id: "decree-13",
          num: "05",
          title: "ベトナム個人データ保護政令（13/2023/ND-CP）への準拠",
          summary: "個人情報保護法制を遵守し、データ主体の権利行使を確実に支援します。",
          content: [
            "DXSが開発するエンドユーザー向けシステムは、ベトナム政令13/2023/ND-CP号に定められた個人情報保護要件に完全に準拠します。",
            "情報主体の権利（開示請求権、訂正権、同意撤回権、消去権）をシステム上で適切に処理できる機能を実装します。",
            "万一のインシデント発生時には、法令で定められた期限内にお客様および所轄官公庁へ迅速に報告・対応する体制を整えています。",
          ],
        },
        {
          id: "liability",
          num: "06",
          title: "責任の範囲および免責事項",
          summary: "契約に基づくサービス品質（SLA）の遵守と合理的な責任範囲の明確化。",
          content: [
            "DXSは専門技術者として最善の注意を払い、契約書に定められたサービス水準合意（SLA）を遵守して業務を遂行します。",
            "天災地変等の不可抗力、お客様が独自に選定した外部インフラの障害、またはお客様側のアカウント管理不備に起因する損害については免責とさせていただきます。",
          ],
        },
      ],

      contactTitle: "法務・情報セキュリティ窓口",
      contactDesc: "秘密保持契約（NDA）の雛形確認やセキュリティ監査に関するご相談は、下記窓口までお問い合わせください：",
      legalDept: "DXS 法務・コンプライアンス・情報セキュリティ部門",
      legalEmail: "legal@dxs.vn",
      legalHotline: "0969 986 980",
      legalAddress: "Keangnam Landmark 72, Pham Hung, Nam Tu Liem, Hanoi, Vietnam",
      ctaBadge: "安心の品質保証",
      ctaHeading: "堅牢なセキュリティ標準のもと、貴社のDXプロジェクトを始動",
      ctaSub: "DXSの技術コンサルタントが、NDAの締結から最適なシステムアーキテクチャ設計までワンストップでご案内いたします。",
    },
  }[lang];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      {/* Dark Hero Banner */}
      <section className="relative bg-[#0b0d14] text-white pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-white/10 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8 uppercase tracking-wider">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {content.home}
            </Link>
            <span>/</span>
            <span className="text-brand-400">{content.eyebrow}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-medium uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              {content.eyebrow}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {content.bannerTitle}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6 font-light">
              {content.bannerSub}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/5 px-3 py-1.5 rounded border border-white/10">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {content.lastUpdated}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sticky Table of Contents & Compliance Badges */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">
                {content.navTitle}
              </h3>
              <nav className="space-y-2">
                {content.sections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="group flex items-start gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors text-sm text-neutral-700 hover:text-brand-600"
                  >
                    <span className="font-mono text-xs text-neutral-400 group-hover:text-brand-600 font-semibold pt-0.5">
                      {item.num}
                    </span>
                    <span className="leading-snug font-medium">
                      {item.title}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Compliance Badges Box */}
            <div className="bg-neutral-900 text-white rounded-xl p-6 border border-neutral-800">
              <div className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-3">
                Security & Compliance
              </div>
              <h4 className="text-base font-bold text-white mb-3">
                Tiêu chuẩn tuân thủ cốt lõi
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Nghị định 13/2023/NĐ-CP (Bảo vệ dữ liệu cá nhân)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Mã hóa TLS 1.3 / AES-256 Encryption</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Nguyên tắc kiểm thử an toàn OWASP Top 10</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Audit Logs bất biến & Phân quyền RBAC</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Right Column: Detailed Clauses */}
          <div className="lg:col-span-8 space-y-12">
            {content.sections.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="scroll-mt-28 bg-white rounded-xl border border-neutral-200 p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block px-2.5 py-1 text-xs font-mono font-bold text-brand-600 bg-brand-50 border border-brand-200 rounded">
                    {item.num}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                    {item.title}
                  </h2>
                </div>
                <p className="text-sm text-neutral-500 font-medium italic mb-6 pb-4 border-b border-neutral-100">
                  {item.summary}
                </p>
                <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {item.content.map((paragraph, idx) => (
                    <p key={idx} className="flex items-start gap-3">
                      <span className="text-brand-500 mt-1 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{paragraph}</span>
                    </p>
                  ))}
                </div>
              </article>
            ))}

            {/* Legal Contact Card */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-xl p-8 border border-neutral-800">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {content.contactTitle}
              </h3>
              <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                {content.contactDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-4 border-t border-white/10">
                <div>
                  <div className="text-xs text-neutral-400 font-mono uppercase mb-1">Cơ quan phụ trách</div>
                  <div className="text-white font-medium">{content.legalDept}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-mono uppercase mb-1">Email chuyên trách</div>
                  <a href={`mailto:${content.legalEmail}`} className="text-brand-400 hover:text-brand-300 font-medium">
                    {content.legalEmail}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-mono uppercase mb-1">Đường dây nóng</div>
                  <a href={`tel:${content.legalHotline.replace(/\s+/g, "")}`} className="text-white font-medium hover:text-brand-400">
                    {content.legalHotline}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-mono uppercase mb-1">Địa chỉ trụ sở</div>
                  <div className="text-neutral-300 text-xs leading-relaxed">{content.legalAddress}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global CTA */}
      <CTA dict={dict} />
    </div>
  );
}
