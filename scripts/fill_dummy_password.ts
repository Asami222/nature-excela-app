import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const dummyPassword = "dummy-password"; // OAuth用ダミー
  const dummyHash = await bcrypt.hash(dummyPassword, 10);

  // password が NULL のユーザーを更新
  const result = await prisma.user.updateMany({
    where: {},
    data: { password: dummyHash },
  });

  console.log(`${result.count} 件の OAuth ユーザーにダミーパスワードを設定しました`);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());