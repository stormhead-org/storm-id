export function matchPermission(userPerms: string[], required: string): boolean {
  for (const up of userPerms) {
    if (up === "*") return true;
    const upParts = up.split(":");
    const reqParts = required.split(":");
    let match = true;
    for (let i = 0; i < Math.max(upParts.length, reqParts.length); i++) {
      const upPart = upParts[i];
      const reqPart = reqParts[i];
      if (upPart === "*") return true;
      if (upPart === undefined || reqPart === undefined) {
        if (upPart === undefined && i >= upParts.length - 1 && up.endsWith(":*")) return true;
        match = false;
        break;
      }
      if (upPart.includes("*")) {
        const regex = new RegExp("^" + upPart.replace(/\*/g, ".*") + "$");
        if (!regex.test(reqPart)) {
          match = false;
          break;
        }
      } else if (upPart !== reqPart) {
        match = false;
        break;
      }
    }
    if (match) return true;
  }
  return false;
}
