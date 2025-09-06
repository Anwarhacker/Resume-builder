"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import type { Certificate } from "@/lib/types"

interface CertificatesFormProps {
  data: Certificate[]
  onChange: (certificates: Certificate[]) => void
}

export function CertificatesForm({ data: certificates, onChange }: CertificatesFormProps) {
  const addCertificate = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      link: "",
    }
    onChange([...certificates, newCertificate])
  }

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    onChange(certificates.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)))
  }

  const removeCertificate = (id: string) => {
    onChange(certificates.filter((cert) => cert.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Certificates</h3>
        <Button onClick={addCertificate} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Certificate
        </Button>
      </div>

      {certificates.map((certificate) => (
        <Card key={certificate.id}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Certificate</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => removeCertificate(certificate.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`cert-name-${certificate.id}`}>Certificate Name</Label>
                <Input
                  id={`cert-name-${certificate.id}`}
                  value={certificate.name}
                  onChange={(e) => updateCertificate(certificate.id, "name", e.target.value)}
                  placeholder="AWS Solutions Architect"
                />
              </div>
              <div>
                <Label htmlFor={`cert-issuer-${certificate.id}`}>Issuer</Label>
                <Input
                  id={`cert-issuer-${certificate.id}`}
                  value={certificate.issuer}
                  onChange={(e) => updateCertificate(certificate.id, "issuer", e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`cert-issue-${certificate.id}`}>Issue Date</Label>
                <Input
                  id={`cert-issue-${certificate.id}`}
                  type="month"
                  value={certificate.issueDate}
                  onChange={(e) => updateCertificate(certificate.id, "issueDate", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`cert-expiry-${certificate.id}`}>Expiry Date (Optional)</Label>
                <Input
                  id={`cert-expiry-${certificate.id}`}
                  type="month"
                  value={certificate.expiryDate}
                  onChange={(e) => updateCertificate(certificate.id, "expiryDate", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`cert-id-${certificate.id}`}>Credential ID (Optional)</Label>
                <Input
                  id={`cert-id-${certificate.id}`}
                  value={certificate.credentialId}
                  onChange={(e) => updateCertificate(certificate.id, "credentialId", e.target.value)}
                  placeholder="ABC123XYZ"
                />
              </div>
              <div>
                <Label htmlFor={`cert-link-${certificate.id}`}>Verification Link (Optional)</Label>
                <Input
                  id={`cert-link-${certificate.id}`}
                  value={certificate.link}
                  onChange={(e) => updateCertificate(certificate.id, "link", e.target.value)}
                  placeholder="https://verify.example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {certificates.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No certificates added yet. Click "Add Certificate" to get started.</p>
        </div>
      )}
    </div>
  )
}
