import { createFileRoute } from "@tanstack/react-router"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export const Route = createFileRoute("/")({
  component: HomePage,
})

type PermissionMode = "ask" | "bypassPermissions" | "allowAllMutativeOperations"

interface Hook {
  type: string
  command: string
}

interface HookMatcher {
  matcher: string
  hooks: Hook[]
}

interface ClaudeSettings {
  permissions?: {
    defaultMode?: PermissionMode
  }
  enableAllProjectMcpServers?: boolean
  outputStyle?: string
  hooks?: {
    PreToolUse?: HookMatcher[]
    PostToolUse?: HookMatcher[]
  }
}

const INITIAL_SETTINGS: ClaudeSettings = {
  permissions: {
    defaultMode: "bypassPermissions",
  },
  enableAllProjectMcpServers: true,
  outputStyle: "ts",
  hooks: {
    PreToolUse: [
      {
        matcher: "Bash",
        hooks: [
          {
            type: "command",
            command:
              'jq -r \'if .tool_input.command | test("bun run dev") then {"decision": "block", "reason": "not allowed"} else empty end\'',
          },
        ],
      },
      {
        matcher: "Read|Write|Edit|MultiEdit",
        hooks: [
          {
            type: "command",
            command:
              'jq -r \'if .tool_input.file_path | test("^\\\\.docs/") then {"decision": "block", "reason": "not allowed"} else empty end\'',
          },
        ],
      },
    ],
    PostToolUse: [
      {
        matcher: "Write|Edit|MultiEdit",
        hooks: [
          {
            type: "command",
            command:
              'jq -r \'.tool_input.file_path | select(endswith(".ts") or endswith(".tsx"))\' | xargs -r bun run format',
          },
        ],
      },
    ],
  },
}

function HomePage() {
  const [settings, setSettings] = useState<ClaudeSettings>(INITIAL_SETTINGS)
  const [jsonText, setJsonText] = useState(
    JSON.stringify(INITIAL_SETTINGS, null, 2),
  )

  // JSONの更新をGUIに反映
  const handleJsonUpdate = (text: string) => {
    setJsonText(text)
    try {
      const parsed = JSON.parse(text) as ClaudeSettings
      setSettings(parsed)
    } catch {
      // JSON構文エラーの場合は何もしない
    }
  }

  // GUIの更新をJSONに反映
  const updateSettings = (newSettings: ClaudeSettings) => {
    setSettings(newSettings)
    setJsonText(JSON.stringify(newSettings, null, 2))
  }

  const updatePermissionMode = (mode: PermissionMode) => {
    updateSettings({
      ...settings,
      permissions: {
        ...settings.permissions,
        defaultMode: mode,
      },
    })
  }

  const updateMcpServers = (enabled: boolean) => {
    updateSettings({
      ...settings,
      enableAllProjectMcpServers: enabled,
    })
  }

  const updateOutputStyle = (style: string) => {
    updateSettings({
      ...settings,
      outputStyle: style,
    })
  }

  const addHookMatcher = (type: "PreToolUse" | "PostToolUse") => {
    updateSettings({
      ...settings,
      hooks: {
        ...settings.hooks,
        [type]: [
          ...(settings.hooks?.[type] || []),
          {
            matcher: "",
            hooks: [{ type: "command", command: "" }],
          },
        ],
      },
    })
  }

  const updateHookMatcher = (
    type: "PreToolUse" | "PostToolUse",
    index: number,
    matcher: string,
  ) => {
    const hooks = settings.hooks?.[type] || []
    hooks[index] = { ...hooks[index], matcher }
    updateSettings({
      ...settings,
      hooks: {
        ...settings.hooks,
        [type]: hooks,
      },
    })
  }

  const updateHookCommand = (
    type: "PreToolUse" | "PostToolUse",
    matcherIndex: number,
    hookIndex: number,
    command: string,
  ) => {
    const matchers = settings.hooks?.[type] || []
    const matcher = matchers[matcherIndex]
    if (matcher) {
      matcher.hooks[hookIndex] = { ...matcher.hooks[hookIndex], command }
      updateSettings({
        ...settings,
        hooks: {
          ...settings.hooks,
          [type]: matchers,
        },
      })
    }
  }

  const removeHookMatcher = (
    type: "PreToolUse" | "PostToolUse",
    index: number,
  ) => {
    const hooks = settings.hooks?.[type] || []
    hooks.splice(index, 1)
    updateSettings({
      ...settings,
      hooks: {
        ...settings.hooks,
        [type]: hooks,
      },
    })
  }

  return (
    <div className="h-screen">
      <div className="grid h-full lg:grid-cols-2">
        {/* 左側：GUI設定 */}
        <div className="overflow-y-auto p-2">
          <div className="mx-auto max-w-2xl">
            <Tabs defaultValue="hooks" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hooks">Hooks</TabsTrigger>
                <TabsTrigger value="general">基本設定</TabsTrigger>
              </TabsList>

              <TabsContent value="hooks" className="space-y-4">
                {/* Pre Tool Use Hooks Section */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold text-xl">
                      Pre Tool Use Hooks
                    </h2>
                    <Button
                      size="sm"
                      onClick={() => addHookMatcher("PreToolUse")}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      追加
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {settings.hooks?.PreToolUse?.map((matcher, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Matcher (例: Bash)"
                              value={matcher.matcher}
                              onChange={(e) =>
                                updateHookMatcher(
                                  "PreToolUse",
                                  i,
                                  e.target.value,
                                )
                              }
                              className="font-medium"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeHookMatcher("PreToolUse", i)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {matcher.hooks.map((hook, j) => (
                            <div key={j}>
                              <Label className="mb-2 block text-sm">
                                Command
                              </Label>
                              <Textarea
                                placeholder="jq command"
                                value={hook.command}
                                onChange={(e) =>
                                  updateHookCommand(
                                    "PreToolUse",
                                    i,
                                    j,
                                    e.target.value,
                                  )
                                }
                                className="font-mono text-sm"
                                rows={3}
                              />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                    {(!settings.hooks?.PreToolUse ||
                      settings.hooks.PreToolUse.length === 0) && (
                      <Card>
                        <CardContent className="py-8">
                          <p className="text-center text-muted-foreground">
                            まだHookがありません
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Post Tool Use Hooks Section */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold text-xl">
                      Post Tool Use Hooks
                    </h2>
                    <Button
                      size="sm"
                      onClick={() => addHookMatcher("PostToolUse")}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      追加
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {settings.hooks?.PostToolUse?.map((matcher, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Matcher (例: Write|Edit)"
                              value={matcher.matcher}
                              onChange={(e) =>
                                updateHookMatcher(
                                  "PostToolUse",
                                  i,
                                  e.target.value,
                                )
                              }
                              className="font-medium"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                removeHookMatcher("PostToolUse", i)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {matcher.hooks.map((hook, j) => (
                            <div key={j}>
                              <Label className="mb-2 block text-sm">
                                Command
                              </Label>
                              <Textarea
                                placeholder="jq command"
                                value={hook.command}
                                onChange={(e) =>
                                  updateHookCommand(
                                    "PostToolUse",
                                    i,
                                    j,
                                    e.target.value,
                                  )
                                }
                                className="font-mono text-sm"
                                rows={3}
                              />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                    {(!settings.hooks?.PostToolUse ||
                      settings.hooks.PostToolUse.length === 0) && (
                      <Card>
                        <CardContent className="py-8">
                          <p className="text-center text-muted-foreground">
                            まだHookがありません
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Permissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="permission-mode" className="mb-3 block">
                      Default Mode
                    </Label>
                    <RadioGroup
                      id="permission-mode"
                      value={settings.permissions?.defaultMode || "ask"}
                      onValueChange={(value) =>
                        updatePermissionMode(value as PermissionMode)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ask" id="ask" />
                        <Label htmlFor="ask">Ask (毎回確認)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bypassPermissions"
                          id="bypassPermissions"
                        />
                        <Label htmlFor="bypassPermissions">
                          Bypass Permissions (確認をスキップ)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="allowAllMutativeOperations"
                          id="allowAllMutativeOperations"
                        />
                        <Label htmlFor="allowAllMutativeOperations">
                          Allow All Mutative Operations (全て許可)
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>MCP Servers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mcp-servers">
                        Enable All Project MCP Servers
                      </Label>
                      <Switch
                        id="mcp-servers"
                        checked={settings.enableAllProjectMcpServers || false}
                        onCheckedChange={updateMcpServers}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Output Style</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="output-style" className="mb-2 block">
                      スタイル名
                    </Label>
                    <Input
                      id="output-style"
                      type="text"
                      value={settings.outputStyle || ""}
                      onChange={(e) => updateOutputStyle(e.target.value)}
                      placeholder="例: ts-vibes"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* 右側：JSONエディタ（sticky） */}
        <div className="sticky top-0 h-screen">
          <div className="flex h-full flex-col gap-0">
            <div className="flex-1 overflow-hidden py-2 pr-2">
              <Textarea
                value={jsonText}
                onChange={(e) => handleJsonUpdate(e.target.value)}
                className="h-full w-full resize-none bg-primary p-2 font-mono text-sm"
                placeholder="JSONを貼り付けてください"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
