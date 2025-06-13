"use client"

import { useState } from "react"
import { Palette, Monitor, Sun, Moon, Smartphone, Save } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVBadge } from "@/components/ui/vv-badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const themes = [
  {
    id: "light",
    name: "Light Theme",
    description: "Clean and bright interface",
    preview: "bg-white border-gray-200",
    primary: "bg-orange-500",
    secondary: "bg-gray-100",
    accent: "bg-blue-500",
    isActive: true,
  },
  {
    id: "dark",
    name: "Dark Theme",
    description: "Easy on the eyes for low-light environments",
    preview: "bg-gray-900 border-gray-700",
    primary: "bg-orange-400",
    secondary: "bg-gray-800",
    accent: "bg-blue-400",
    isActive: false,
  },
  {
    id: "auto",
    name: "Auto Theme",
    description: "Automatically switches based on system preference",
    preview: "bg-gradient-to-r from-white to-gray-900 border-gray-400",
    primary: "bg-orange-500",
    secondary: "bg-gray-200",
    accent: "bg-blue-500",
    isActive: false,
  },
]

const colorSchemes = [
  {
    id: "orange",
    name: "Orange (Default)",
    primary: "#ea580c",
    secondary: "#fed7aa",
    colors: ["bg-orange-500", "bg-orange-400", "bg-orange-300", "bg-orange-200"],
    isActive: true,
  },
  {
    id: "blue",
    name: "Blue",
    primary: "#2563eb",
    secondary: "#bfdbfe",
    colors: ["bg-blue-500", "bg-blue-400", "bg-blue-300", "bg-blue-200"],
    isActive: false,
  },
  {
    id: "green",
    name: "Green",
    primary: "#16a34a",
    secondary: "#bbf7d0",
    colors: ["bg-green-500", "bg-green-400", "bg-green-300", "bg-green-200"],
    isActive: false,
  },
  {
    id: "purple",
    name: "Purple",
    primary: "#9333ea",
    secondary: "#ddd6fe",
    colors: ["bg-purple-500", "bg-purple-400", "bg-purple-300", "bg-purple-200"],
    isActive: false,
  },
]

export default function ThemesPage() {
  const [selectedTheme, setSelectedTheme] = useState("light")
  const [selectedColorScheme, setSelectedColorScheme] = useState("orange")
  const [settings, setSettings] = useState({
    enableDarkMode: true,
    enableAutoTheme: true,
    enableCustomColors: false,
    enableAnimations: true,
    enableSounds: false,
    compactMode: false,
    highContrast: false,
  })

  const handleSaveTheme = () => {
    console.log("Saving theme settings:", { selectedTheme, selectedColorScheme, settings })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Theme Settings</h1>
          <p className="text-gray-600">Customize the appearance of your admin portal</p>
        </div>

        <VVButton onClick={handleSaveTheme}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </VVButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Selection */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Theme Selection</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedTheme === theme.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{theme.name}</h4>
                    <p className="text-sm text-gray-600">{theme.description}</p>
                  </div>
                  {selectedTheme === theme.id && <VVBadge variant="success">Active</VVBadge>}
                </div>

                {/* Theme Preview */}
                <div className={`h-20 rounded-lg border-2 ${theme.preview} p-3 flex items-center justify-between`}>
                  <div className="flex gap-2">
                    <div className={`w-4 h-4 rounded ${theme.primary}`}></div>
                    <div className={`w-4 h-4 rounded ${theme.secondary}`}></div>
                    <div className={`w-4 h-4 rounded ${theme.accent}`}></div>
                  </div>
                  <div className="flex gap-1">
                    {theme.id === "light" && <Sun className="h-4 w-4 text-gray-600" />}
                    {theme.id === "dark" && <Moon className="h-4 w-4 text-gray-300" />}
                    {theme.id === "auto" && <Monitor className="h-4 w-4 text-gray-500" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VVCard>

        {/* Color Schemes */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Color Schemes</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {colorSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedColorScheme === scheme.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedColorScheme(scheme.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{scheme.name}</h4>
                  </div>
                  {selectedColorScheme === scheme.id && <VVBadge variant="success">Active</VVBadge>}
                </div>

                {/* Color Preview */}
                <div className="flex gap-2">
                  {scheme.colors.map((color, index) => (
                    <div key={index} className={`w-8 h-8 rounded-lg ${color}`}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </VVCard>

        {/* Theme Settings */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Display Settings</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableDarkMode">Enable Dark Mode</Label>
                <p className="text-sm text-gray-500">Allow switching to dark theme</p>
              </div>
              <Switch
                id="enableDarkMode"
                checked={settings.enableDarkMode}
                onCheckedChange={(checked) => setSettings({ ...settings, enableDarkMode: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableAutoTheme">Auto Theme Switching</Label>
                <p className="text-sm text-gray-500">Follow system theme preference</p>
              </div>
              <Switch
                id="enableAutoTheme"
                checked={settings.enableAutoTheme}
                onCheckedChange={(checked) => setSettings({ ...settings, enableAutoTheme: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="compactMode">Compact Mode</Label>
                <p className="text-sm text-gray-500">Reduce spacing and padding</p>
              </div>
              <Switch
                id="compactMode"
                checked={settings.compactMode}
                onCheckedChange={(checked) => setSettings({ ...settings, compactMode: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="highContrast">High Contrast</Label>
                <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
              </div>
              <Switch
                id="highContrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) => setSettings({ ...settings, highContrast: checked })}
              />
            </div>
          </div>
        </VVCard>

        {/* Advanced Settings */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableCustomColors">Custom Color Picker</Label>
                <p className="text-sm text-gray-500">Allow custom brand colors</p>
              </div>
              <Switch
                id="enableCustomColors"
                checked={settings.enableCustomColors}
                onCheckedChange={(checked) => setSettings({ ...settings, enableCustomColors: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableAnimations">Enable Animations</Label>
                <p className="text-sm text-gray-500">Smooth transitions and effects</p>
              </div>
              <Switch
                id="enableAnimations"
                checked={settings.enableAnimations}
                onCheckedChange={(checked) => setSettings({ ...settings, enableAnimations: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableSounds">Enable Sound Effects</Label>
                <p className="text-sm text-gray-500">Audio feedback for actions</p>
              </div>
              <Switch
                id="enableSounds"
                checked={settings.enableSounds}
                onCheckedChange={(checked) => setSettings({ ...settings, enableSounds: checked })}
              />
            </div>
          </div>
        </VVCard>
      </div>

      {/* Preview Section */}
      <VVCard>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Theme Preview</h3>
          <p className="text-gray-600">Preview how your admin portal will look with the selected theme</p>
        </div>
        <div className="p-6">
          <div
            className={`border-2 border-gray-200 rounded-lg p-6 ${selectedTheme === "dark" ? "bg-gray-900" : "bg-white"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-lg font-semibold ${selectedTheme === "dark" ? "text-white" : "text-gray-900"}`}>
                Sample Dashboard
              </h4>
              <VVBadge variant="success">Live Preview</VVBadge>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className={`p-4 rounded-lg ${selectedTheme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className={`text-sm ${selectedTheme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  Total Orders
                </div>
                <div className={`text-2xl font-bold ${selectedTheme === "dark" ? "text-white" : "text-gray-900"}`}>
                  1,247
                </div>
              </div>
              <div className={`p-4 rounded-lg ${selectedTheme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className={`text-sm ${selectedTheme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Revenue</div>
                <div className={`text-2xl font-bold ${selectedTheme === "dark" ? "text-white" : "text-gray-900"}`}>
                  ₹45,678
                </div>
              </div>
              <div className={`p-4 rounded-lg ${selectedTheme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className={`text-sm ${selectedTheme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  Active Users
                </div>
                <div className={`text-2xl font-bold ${selectedTheme === "dark" ? "text-white" : "text-gray-900"}`}>
                  892
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <VVButton size="sm">Primary Action</VVButton>
              <VVButton variant="outline" size="sm">
                Secondary Action
              </VVButton>
            </div>
          </div>
        </div>
      </VVCard>
    </div>
  )
}
